export async function getHealth() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);

  if (!response.ok) {
    throw new Error(`Health check request failed with status ${response.status}`);
  }

  return response.json();
}
