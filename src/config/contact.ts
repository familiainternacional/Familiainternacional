/** Contactos principales de Familia Internacional. */
export const teamContacts = [
  {
    name: 'Jaime Soto Silva',
    email: 'contacto@familiainternacional.cl',
  },
] as const;

export const primaryContact = {
  displayPhone: '+56 9 9145 2412',
  phoneHref: 'tel:+56991452412',
  whatsappNumber: '+56991452412',
  email: teamContacts[0].email,
} as const;
