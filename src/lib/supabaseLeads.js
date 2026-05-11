const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function saveContactLead({ name, email, message, marketingConsent }) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { skipped: true };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
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
    throw new Error('Impossible d’enregistrer le contact dans Supabase.');
  }

  return { saved: true };
}
