export const LEAD_SOURCE_LABELS: Record<string, string> = {
  home_hero_form: 'Home — formulario hero',
  home_contact_form: 'Home — sección contacto',
  evalua_tu_caso_form: 'Evalúa tu caso',
  home_contact_form_legacy: 'Formulario contacto',
  web_form: 'Formulario web',
};

export function getLeadSourceLabel(source: string) {
  return LEAD_SOURCE_LABELS[source] ?? source.replace(/_/g, ' ');
}
