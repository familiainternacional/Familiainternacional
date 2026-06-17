export const forms = {
  evalua: {
    title1: 'Evaluate your ',
    title2: 'Case',
    description:
      'Our team is ready to analyze your legal situation. Fill out the form and we will provide an initial assessment to define the best strategy.',
    whyChooseUs: 'Why choose us?',
    specialists: 'Specialists',
    specialistsDesc:
      'Professionals with direct experience in international family law and applicable treaties.',
    fastResponse: 'Fast Response',
    fastResponseDesc:
      'We review your inquiry and contact you as soon as possible so your case is not delayed.',
    confidentiality: 'Total Confidentiality',
    confidentialityDesc:
      'All information you provide will be handled with absolute privacy and security.',
    contactDirect: 'Direct Contact',
    contactDirectDesc:
      'If you prefer, you can also call us or write to us directly at our email.',
    fields: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Contact Phone',
      message: 'Description of your Case',
      namePlaceholder: 'e.g. John Smith',
      emailPlaceholder: 'email@example.com',
      phonePlaceholder: '+1 555 123 4567',
      messagePlaceholder: 'Briefly describe your situation...',
    },
    submit: 'Request Evaluation',
    submitting: 'Submitting...',
    success: 'We have received your request!',
    successDesc:
      'A lawyer from our team will review your case and contact you as soon as possible.',
    sendAnother: 'Send another inquiry',
    error:
      'An error occurred while submitting your request. Please try again or contact us by phone.',
  },
  contact: {
    fields: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Contact Phone',
      message: 'Message',
      namePlaceholder: 'e.g. John Smith',
      emailPlaceholder: 'email@example.com',
      phonePlaceholder: '+1 555 123 4567',
      messagePlaceholder: 'How can we help you?',
    },
    submit: 'Send Message',
    submitting: 'Sending...',
    success: 'Message Sent!',
    successDesc: 'Our team will get back to you shortly.',
    sendAnother: 'Send another message',
    error: 'An error occurred while submitting your request.',
  },
} as const;
