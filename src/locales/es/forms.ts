export const forms = {
  evalua: {
    title1: 'Evalúa tu ',
    title2: 'Caso',
    description:
      'Nuestro equipo de expertos está listo para analizar tu situación legal. Completa el formulario y te daremos una evaluación inicial para definir la mejor estrategia.',
    whyChooseUs: '¿Por qué elegirnos?',
    specialists: 'Especialistas',
    specialistsDesc:
      'Profesionales con experiencia directa en derecho de familia internacional y convenios aplicables.',
    fastResponse: 'Respuesta Rápida',
    fastResponseDesc:
      'Analizamos tu consulta y te contactamos en el menor tiempo posible para no retrasar tus procesos.',
    confidentiality: 'Confidencialidad Total',
    confidentialityDesc:
      'Toda la información que nos proporciones será tratada con absoluta reserva y seguridad.',
    contactDirect: 'Contacto Directo',
    contactDirectDesc:
      'Si prefieres, también puedes llamarnos o escribirnos directamente a nuestro correo.',
    fields: {
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Teléfono de Contacto',
      message: 'Descripción de su Caso',
      namePlaceholder: 'Ej. Juan Pérez',
      emailPlaceholder: 'correo@ejemplo.com',
      phonePlaceholder: '+56 9 1234 5678',
      messagePlaceholder: 'Cuéntenos brevemente su situación...',
    },
    submit: 'Solicitar Evaluación',
    submitting: 'Enviando...',
    success: '¡Hemos recibido su solicitud!',
    successDesc:
      'Un abogado de nuestro equipo revisará su caso y se pondrá en contacto con usted a la brevedad posible.',
    sendAnother: 'Enviar otra consulta',
    error:
      'Ocurrió un error al enviar su solicitud. Por favor, intente nuevamente o contáctenos por teléfono.',
  },
  contact: {
    fields: {
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Teléfono de Contacto',
      message: 'Mensaje',
      namePlaceholder: 'Ej. Juan Pérez',
      emailPlaceholder: 'correo@ejemplo.com',
      phonePlaceholder: '+56 9 1234 5678',
      messagePlaceholder: '¿En qué podemos ayudarle?',
    },
    submit: 'Enviar Mensaje',
    submitting: 'Enviando...',
    success: '¡Mensaje Enviado!',
    successDesc: 'Nuestro equipo se pondrá en contacto a la brevedad.',
    sendAnother: 'Enviar otro mensaje',
    error: 'Ocurrió un error al enviar su solicitud.',
  },
} as const;
