'use client';

import { useContext } from 'react';
import { GoogleReCaptchaContext } from 'react-google-recaptcha-v3';
import { isRecaptchaConfiguredOnClient } from '@/lib/security/recaptcha-config';

/** Safe reCAPTCHA executor: undefined when disabled or provider not mounted. */
export function useOptionalExecuteRecaptcha() {
  const context = useContext(GoogleReCaptchaContext);

  if (!isRecaptchaConfiguredOnClient()) {
    return undefined;
  }

  return context.executeRecaptcha;
}
