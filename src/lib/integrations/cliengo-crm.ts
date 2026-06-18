const CLIENGO_API_BASE = 'https://api.cliengo.com/1.0';
const DEFAULT_WEBSITE_ID = '5fb67d0e9c17fd002a2e608f';

export type CliengoContactInput = {
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  leadSource?: string | null;
  leadId?: string;
};

export type CliengoContactResult = {
  configured: boolean;
  synced: boolean;
  contactId?: string;
};

export function isCliengoCrmConfigured() {
  return Boolean(process.env.CLIENGO_API_KEY?.trim());
}

export function getCliengoWebsiteId() {
  const configured = process.env.CLIENGO_WEBSITE_ID?.trim();
  if (configured) {
    return configured;
  }

  const scriptUrl = process.env.NEXT_PUBLIC_CLIENGO_SCRIPT_URL?.trim();
  if (scriptUrl) {
    const match = scriptUrl.match(/weboptimizer\/[^/]+\/([^/.]+)/);
    if (match?.[1]) {
      return match[1];
    }
  }

  return DEFAULT_WEBSITE_ID;
}

function buildCliengoMessage(input: CliengoContactInput) {
  const parts: string[] = [];

  if (input.leadSource?.trim()) {
    parts.push(`Origen: ${input.leadSource.trim()}`);
  }

  if (input.message?.trim()) {
    parts.push(input.message.trim());
  }

  if (input.leadId) {
    parts.push(`ID interno: ${input.leadId}`);
  }

  return parts.join('\n\n') || undefined;
}

export async function createCliengoContact(input: CliengoContactInput): Promise<CliengoContactResult> {
  const apiKey = process.env.CLIENGO_API_KEY?.trim();
  if (!apiKey) {
    return { configured: false, synced: false };
  }

  const payload = {
    websiteId: getCliengoWebsiteId(),
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || undefined,
    message: buildCliengoMessage(input),
    status: 'new',
  };

  try {
    const response = await fetch(`${CLIENGO_API_BASE}/contacts?api_key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[cliengo-crm] No se pudo crear el contacto.', response.status, errorBody);
      return { configured: true, synced: false };
    }

    const data = (await response.json()) as { id?: string };
    return {
      configured: true,
      synced: true,
      contactId: data.id,
    };
  } catch (error) {
    console.error('[cliengo-crm] Error de red al crear contacto.', error);
    return { configured: true, synced: false };
  }
}
