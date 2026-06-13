const DEFAULT_CLIENGO_SCRIPT_URL =
  'https://s.cliengo.com/weboptimizer/5fb67d0d9c17fd002a2e608c/5fb67d0e9c17fd002a2e608f.js?platform=website';

export function getCliengoScriptUrl(): string | null {
  const configured = process.env.NEXT_PUBLIC_CLIENGO_SCRIPT_URL?.trim();
  if (configured === 'false' || configured === '0') {
    return null;
  }

  if (configured) {
    return configured;
  }

  const enabled = process.env.NEXT_PUBLIC_CLIENGO_ENABLED?.trim().toLowerCase();
  if (enabled === 'true' || enabled === '1') {
    return DEFAULT_CLIENGO_SCRIPT_URL;
  }

  return null;
}

export function isCliengoEnabled(): boolean {
  return getCliengoScriptUrl() !== null;
}
