const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'contact.devnabil@gmail.com';
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || 'Portfolio Nabil <onboarding@resend.dev>';

function sanitize(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return sanitize(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function saveLead({ name, email, message, marketingConsent }) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      marketing_consent: marketingConsent,
      source: 'portfolio',
    }),
  });

  if (!response.ok) {
    throw new Error('Supabase insert failed');
  }
}

async function sendEmail({ name, email, message, marketingConsent }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing');
  }

  const html = `
    <h2>Nouvelle demande depuis le portfolio</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Consentement relance :</strong> ${marketingConsent ? 'Oui' : 'Non'}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Nouvelle demande portfolio - ${name}`,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error('Resend email failed');
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const name = sanitize(request.body?.name);
    const email = sanitize(request.body?.email);
    const message = sanitize(request.body?.message);
    const marketingConsent = Boolean(request.body?.marketingConsent);

    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    await saveLead({ name, email, message, marketingConsent });
    await sendEmail({ name, email, message, marketingConsent });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Unable to send contact request' });
  }
}
