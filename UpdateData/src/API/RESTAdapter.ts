
export async function get<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(endpoint);

  if (!response.ok) {
    console.error(response.status);
    console.error(response.text);
  }

  const data = await response.json();
  return data as T[];
}