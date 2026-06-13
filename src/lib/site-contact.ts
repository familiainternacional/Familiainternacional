import type { SiteSettingsAdminValues } from '@/app/admin/ajustes/actions';
import { primaryContact } from '@/config/contact';
import { siteConfig } from '@/config/site';

const defaultOfficeLines = siteConfig.offices[0]?.addressLines ?? ['Lo Barnechea', 'Santiago, Chile'];

export const defaultOfficeAddressMultiline = defaultOfficeLines.join('\n');
export const defaultOfficeAddressInline = defaultOfficeLines.join(', ');

const LEGACY_RLU_PATTERNS = {
  email: /rluabogados\.cl/i,
  phone: /3540\s*6356|56935406356/i,
  address: /apoquindo/i,
};

function hasLegacyRluContact(values: SiteSettingsAdminValues): boolean {
  return (
    LEGACY_RLU_PATTERNS.email.test(values.primaryEmail ?? '') ||
    LEGACY_RLU_PATTERNS.phone.test(values.primaryPhone ?? '') ||
    LEGACY_RLU_PATTERNS.phone.test(values.whatsappNumber ?? '') ||
    LEGACY_RLU_PATTERNS.address.test(values.officeAddress ?? '')
  );
}

export type ResolvedSiteContact = {
  primaryPhone: string;
  primaryPhoneHref: string;
  primaryEmail: string;
  officeAddressInline: string;
  officeAddressMultiline: string;
};

export function resolveSiteContact(adminValues?: SiteSettingsAdminValues | null): ResolvedSiteContact {
  const useAdmin =
    adminValues &&
    (adminValues.primaryPhone || adminValues.primaryEmail || adminValues.officeAddress) &&
    !hasLegacyRluContact(adminValues);

  const primaryPhone =
    useAdmin && adminValues.primaryPhone ? adminValues.primaryPhone : siteConfig.contact.primaryPhoneLabel;

  const primaryPhoneHref =
    useAdmin && adminValues.primaryPhone
      ? `tel:${adminValues.primaryPhone.replace(/\s/g, '')}`
      : siteConfig.contact.primaryPhoneHref;

  const primaryEmail =
    useAdmin && adminValues.primaryEmail ? adminValues.primaryEmail : primaryContact.email;

  const officeAddressMultiline =
    useAdmin && adminValues.officeAddress ? adminValues.officeAddress : defaultOfficeAddressMultiline;

  return {
    primaryPhone,
    primaryPhoneHref,
    primaryEmail,
    officeAddressInline: officeAddressMultiline.replace(/\n/g, ', '),
    officeAddressMultiline,
  };
}
