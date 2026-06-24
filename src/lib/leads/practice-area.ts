import { serviceLandings } from '@/config/service-landings';

export const PRACTICE_AREAS = [
  { id: 'consulta_general', label: 'Consulta general' },
  ...serviceLandings.map((service) => ({
    id: service.slug,
    label: service.shortTitle,
  })),
] as const;

export type PracticeAreaId = (typeof PRACTICE_AREAS)[number]['id'];

const PRACTICE_AREA_SET = new Set<string>(PRACTICE_AREAS.map((area) => area.id));

export function isPracticeAreaId(value: string): value is PracticeAreaId {
  return PRACTICE_AREA_SET.has(value);
}

export function getPracticeAreaLabel(id: string | null | undefined) {
  if (!id) return 'Sin clasificar';
  return PRACTICE_AREAS.find((area) => area.id === id)?.label ?? id.replace(/-/g, ' ');
}
