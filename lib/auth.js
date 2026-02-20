export async function apiPost(path, body) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");

  return data;
}
