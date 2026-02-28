import { createClient } from './supabaseClient';

export async function fetchWithAuth(endpoint, options = {}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    Authorization: `Bearer ${session.access_token}`,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function getHealth() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);

  if (!response.ok) {
    throw new Error(`Health check request failed with status ${response.status}`);
  }

  return response.json();
}
