import { NextRequest, NextResponse } from 'next/server';
import NVIDIAAIService from '@/lib/nvidia-ai';
import { requireAdminApiSession } from '@/lib/supabase/auth';
import { enforceRateLimitFromRequest, RATE_LIMITS } from '@/server/security/rate-limit';

const MAX_PAYLOAD_BYTES = 100_000;

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
    keyPrefix: 'ai-summarize',
    ...RATE_LIMITS.ai,
    message: 'Demasiadas solicitudes de resumen. Intenta nuevamente en unos minutos.',
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

    const { documentText, documentType } = body;

    if (!documentText) {
      return NextResponse.json(
        { error: 'Se requiere el texto del documento' },
        { status: 400 }
      );
    }

    const aiService = new NVIDIAAIService();
    const summary = await aiService.summarizeDocument(documentText, documentType);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error en API de resumen:', error);
    return NextResponse.json(
      { error: 'Error al procesar el documento' },
      { status: 500 }
    );
  }
}
