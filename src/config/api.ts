export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

export const API_ROUTES = {
  leads: `${API_PREFIX}/leads`,
} as const;
