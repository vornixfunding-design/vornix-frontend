export async function fetchWithAuth(endpoint, options = {}) {
  const token =
    options.token ||
    (typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null);

  if (!token) {
    throw new Error('Not authenticated');
  }

  const { token: _unusedToken, headers: optionHeaders, ...restOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...optionHeaders,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...restOptions,
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
