import { NextRequest, NextResponse } from 'next/server';
import NVIDIAAIService from '@/lib/nvidia-ai';
import { requireAdminApiSession } from '@/lib/supabase/auth';
import { enforceRateLimitFromRequest, RATE_LIMITS } from '@/server/security/rate-limit';

const MAX_PAYLOAD_BYTES = 32_000;

function payloadTooLargeResponse() {
  return NextResponse.json({ error: 'La solicitud supera el tamaño permitido.' }, { status: 413 });
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    const auth = await requireAdminApiSession();
    if (auth instanceof NextResponse) {
      return new NextResponse(null, { status: 404 });
    }
  }

  const rateLimited = await enforceRateLimitFromRequest(request, {
    keyPrefix: 'ai-classify',
    ...RATE_LIMITS.ai,
    message: 'Demasiadas solicitudes de clasificación. Intenta nuevamente en unos minutos.',
  });

  if (rateLimited) {
    return rateLimited;
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return payloadTooLargeResponse();
  }

  try {
    const body = await request.json();

    if (JSON.stringify(body).length > MAX_PAYLOAD_BYTES) {
      return payloadTooLargeResponse();
    }

    const { caseDescription } = body;

    if (!caseDescription) {
      return NextResponse.json(
        { error: 'Se requiere la descripción del caso' },
        { status: 400 }
      );
    }

    const aiService = new NVIDIAAIService();
    const classification = await aiService.classifyCase(caseDescription);

    return NextResponse.json({ classification });
  } catch (error) {
    console.error('Error en API de clasificación:', error);
    return NextResponse.json(
      { error: 'Error al clasificar el caso' },
      { status: 500 }
    );
  }
}
