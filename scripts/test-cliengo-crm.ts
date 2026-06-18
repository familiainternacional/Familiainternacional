import { createCliengoContact, getCliengoWebsiteId, isCliengoCrmConfigured } from '../src/lib/integrations/cliengo-crm';

async function main() {
  console.log('CLIENGO CRM test');
  console.log('- configured:', isCliengoCrmConfigured());
  console.log('- websiteId:', getCliengoWebsiteId());

  const stamp = Date.now();
  const result = await createCliengoContact({
    name: 'Test Integracion FI',
    email: `test-fi-${stamp}@example.invalid`,
    phone: '+56912345678',
    message: 'Prueba automatica de sincronizacion desde el formulario web.',
    leadSource: 'home_contact_form',
    leadId: `test-${stamp}`,
  });

  console.log('- sync result:', result);

  if (!result.configured) {
    console.error('FAIL: CLIENGO_API_KEY no configurada.');
    process.exit(1);
  }

  if (!result.synced || !result.contactId) {
    console.error('FAIL: Cliengo no acepto el contacto.');
    process.exit(1);
  }

  const apiKey = process.env.CLIENGO_API_KEY?.trim();
  const verifyUrl = `https://api.cliengo.com/1.0/contacts/${result.contactId}?api_key=${encodeURIComponent(apiKey ?? '')}`;
  const verifyResponse = await fetch(verifyUrl, { cache: 'no-store' });

  if (!verifyResponse.ok) {
    console.error('FAIL: No se pudo verificar el contacto en Cliengo.', verifyResponse.status);
    process.exit(1);
  }

  const contact = (await verifyResponse.json()) as {
    id: string;
    name: string;
    email: string;
    entryMethod?: string;
    websiteName?: string;
  };

  console.log('- verified contact:', {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    entryMethod: contact.entryMethod,
    website: contact.websiteName,
  });

  console.log('OK: Integracion Cliengo CRM operativa.');
}

main().catch((error) => {
  console.error('FAIL:', error);
  process.exit(1);
});
