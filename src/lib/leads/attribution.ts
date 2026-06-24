export type LeadAttributionInput = {
  landingPath?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
};

function trimOrNull(value: unknown, max = 500) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export function parseLeadAttribution(body: Record<string, unknown>): LeadAttributionInput {
  return {
    landingPath: trimOrNull(body.landingPath, 300),
    referrer: trimOrNull(body.referrer, 500),
    utmSource: trimOrNull(body.utmSource, 120),
    utmMedium: trimOrNull(body.utmMedium, 120),
    utmCampaign: trimOrNull(body.utmCampaign, 120),
    utmContent: trimOrNull(body.utmContent, 120),
    utmTerm: trimOrNull(body.utmTerm, 120),
  };
}

export function getLeadAttributionFromBrowser(): LeadAttributionInput {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);

  return {
    landingPath: window.location.pathname,
    referrer: document.referrer || null,
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    utmContent: params.get('utm_content'),
    utmTerm: params.get('utm_term'),
  };
}

export function hasAttributionData(attribution: LeadAttributionInput) {
  return Boolean(
    attribution.landingPath ||
      attribution.referrer ||
      attribution.utmSource ||
      attribution.utmMedium ||
      attribution.utmCampaign ||
      attribution.utmContent ||
      attribution.utmTerm,
  );
}
