export async function validateResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Server error details:', errorData);
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
  }
}