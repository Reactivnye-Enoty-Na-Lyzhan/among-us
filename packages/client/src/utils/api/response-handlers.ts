export function jsonOtherwiseTextHandler(response: Response) {
  const isJson = response.headers
    .get('Content-Type')
    ?.includes('application/json');
  return isJson ? response.json() : response.text();
}
