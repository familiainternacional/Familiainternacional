import nodemailer from 'nodemailer';

type LeadNotificationInput = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  createdAt: Date;
};

type LeadNotificationResult = {
  configured: boolean;
  sent: boolean;
};

const DEFAULT_RECIPIENTS = ['contacto@familiainternacional.cl'];

function readBooleanEnv(name: string, fallback: boolean) {
  const value = process.env[name]?.trim().toLowerCase();

  if (!value) return fallback;
  return value === 'true' || value === '1' || value === 'yes';
}

function readNumberEnv(name: string, fallback: number) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
}

function readRecipients() {
  const configuredRecipients = process.env.LEAD_NOTIFICATION_TO?.trim();
  const rawRecipients = configuredRecipients || DEFAULT_RECIPIENTS.join(',');

  return rawRecipients
    .split(',')
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatValue(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : 'No informado';
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Santiago',
  }).format(date);
}

function getPhoneHref(phone?: string | null) {
  const normalized = phone?.replace(/[^\d+]/g, '').trim();
  return normalized ? `tel:${normalized}` : null;
}

function buildMailtoHref(email: string, leadName: string) {
  const subject = encodeURIComponent(`Consulta web - ${leadName}`);
  return `mailto:${email}?subject=${subject}`;
}

function buildTextBody(lead: LeadNotificationInput) {
  return [
    'Nuevo caso web - Familia Internacional',
    '',
    'DATOS DEL SOLICITANTE',
    `Nombre completo: ${formatValue(lead.name)}`,
    `Correo electronico: ${formatValue(lead.email)}`,
    `Telefono: ${formatValue(lead.phone)}`,
    '',
    'DETALLE DEL CASO',
    formatValue(lead.message),
    '',
    'SEGUIMIENTO INTERNO',
    `Fecha: ${formatDate(lead.createdAt)}`,
    `ID lead: ${lead.id}`,
    'Origen: Formulario Evalua tu caso',
  ].join('\n');
}

function buildHtmlBody(lead: LeadNotificationInput) {
  const phoneHref = getPhoneHref(lead.phone);
  const emailHref = buildMailtoHref(lead.email, lead.name);

  const detailRow = (label: string, value?: string | null, href?: string | null) => {
    const formattedValue = formatValue(value);
    const content = href
      ? `<a href="${escapeHtml(href)}" style="color:#07234c;text-decoration:none;">${escapeHtml(formattedValue)}</a>`
      : escapeHtml(formattedValue);

    return `
      <tr>
        <td style="padding:13px 16px;border-bottom:1px solid #e7e7e7;color:#666;font-size:13px;line-height:1.45;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:13px 16px;border-bottom:1px solid #e7e7e7;color:#07234c;font-size:15px;line-height:1.45;font-weight:700;vertical-align:top;">${content}</td>
      </tr>
    `;
  };

  return `
    <div style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#07234c;">
      <div style="max-width:720px;margin:0 auto;padding:36px 18px;">
        <div style="overflow:hidden;background:#ffffff;border:1px solid #e5e5e5;border-radius:18px;">
          <div style="background:#07234c;padding:30px 28px;color:#ffffff;">
            <p style="margin:0 0 10px;color:#8090a0;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">Nuevo caso web</p>
            <h1 style="margin:0;font-size:26px;line-height:1.2;color:#ffffff;">Familia Internacional</h1>
            <p style="margin:14px 0 0;max-width:560px;font-size:15px;line-height:1.65;color:#d7d7d7;">Se recibio una nueva solicitud desde el formulario Evalua tu caso.</p>
          </div>

          <div style="padding:28px;">
            <h2 style="margin:0 0 14px;font-size:17px;line-height:1.3;color:#07234c;">Datos del solicitante</h2>
            <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin:0 0 26px;background:#fafafa;border:1px solid #ececec;border-radius:12px;overflow:hidden;">
              ${detailRow('Nombre completo', lead.name)}
              ${detailRow('Correo electronico', lead.email, emailHref)}
              ${detailRow('Telefono', lead.phone, phoneHref)}
            </table>

            <h2 style="margin:0 0 14px;font-size:17px;line-height:1.3;color:#07234c;">Detalle del caso</h2>
            <div style="margin:0 0 26px;padding:18px 18px;background:#f4f4f5;border:1px solid #e7e7e7;border-radius:12px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#222;white-space:pre-wrap;">${escapeHtml(formatValue(lead.message))}</p>
            </div>

            <h2 style="margin:0 0 14px;font-size:17px;line-height:1.3;color:#07234c;">Seguimiento interno</h2>
            <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin:0 0 28px;background:#ffffff;border:1px solid #ececec;border-radius:12px;overflow:hidden;">
              ${detailRow('Fecha de ingreso', formatDate(lead.createdAt))}
              ${detailRow('ID lead', lead.id)}
              ${detailRow('Origen', 'Formulario Evalua tu caso')}
            </table>

            <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:0 10px 0 0;">
                  <a href="${escapeHtml(emailHref)}" style="display:block;background:#0d3566;border-radius:999px;color:#ffffff;font-size:14px;font-weight:800;line-height:1.2;padding:14px 20px;text-align:center;text-decoration:none;">Responder correo</a>
                </td>
                <td style="padding:0 0 0 10px;">
                  ${
                    phoneHref
                      ? `<a href="${escapeHtml(phoneHref)}" style="display:block;background:#07234c;border-radius:999px;color:#ffffff;font-size:14px;font-weight:800;line-height:1.2;padding:14px 20px;text-align:center;text-decoration:none;">Llamar cliente</a>`
                      : '<span style="display:block;background:#e5e5e5;border-radius:999px;color:#777;font-size:14px;font-weight:800;line-height:1.2;padding:14px 20px;text-align:center;">Telefono no informado</span>'
                  }
                </td>
              </tr>
            </table>

            <p style="margin:22px 0 0;font-size:12px;line-height:1.6;color:#777;">Este correo fue generado automaticamente por el sitio web. La respuesta se dirige al correo informado por el solicitante.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function sendLeadNotification(lead: LeadNotificationInput): Promise<LeadNotificationResult> {
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.trim();
  const recipients = readRecipients();

  if (!user || !password || recipients.length === 0) {
    return { configured: false, sent: false };
  }

  const port = readNumberEnv('SMTP_PORT', 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
    port,
    secure: readBooleanEnv('SMTP_SECURE', port === 465),
    auth: {
      user,
      pass: password,
    },
  });

  await transporter.sendMail({
    from: process.env.LEAD_NOTIFICATION_FROM?.trim() || `Familia Internacional <${user}>`,
    to: recipients,
    replyTo: lead.email,
    subject: `Nuevo caso web: ${lead.name}`,
    text: buildTextBody(lead),
    html: buildHtmlBody(lead),
  });

  return { configured: true, sent: true };
}
