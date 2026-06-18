import { NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/db/prisma';
import { createCliengoContact } from '@/lib/integrations/cliengo-crm';
import { sendLeadNotification } from '@/lib/email/lead-notification';
import { verifyRecaptchaToken } from '@/lib/security/recaptcha';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = typeof body.phone === 'string' ? body.phone.trim() : null;
    const message = typeof body.message === 'string' ? body.message.trim() : null;
    const leadSource = typeof body.leadSource === 'string' ? body.leadSource.trim() : null;
    const recaptchaToken = typeof body.recaptchaToken === 'string' ? body.recaptchaToken : null;
    const recaptchaAction = typeof body.recaptchaAction === 'string' ? body.recaptchaAction : undefined;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y correo son obligatorios.' },
        { status: 400 },
      );
    }

    const recaptcha = await verifyRecaptchaToken(recaptchaToken, {
      expectedAction: recaptchaAction,
      remoteIp: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    });

    if (!recaptcha.ok) {
      return NextResponse.json({ error: recaptcha.error }, { status: 400 });
    }

    const prisma = getPrismaClient();

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        status: 'pendiente',
        leadSource: leadSource || 'evalua_tu_caso_form',
      },
    });

    const [notification, cliengo] = await Promise.all([
      sendLeadNotification({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        createdAt: lead.createdAt,
      }).catch((notificationError) => {
        console.error('Error sending lead notification:', notificationError);
        return { configured: true, sent: false };
      }),
      createCliengoContact({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        leadSource: lead.leadSource,
        leadId: lead.id,
      }),
    ]);

    return NextResponse.json({ success: true, lead, notification, cliengo }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
