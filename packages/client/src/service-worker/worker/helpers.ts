export function getURL(request: RequestInfo): string {
  if (typeof request === 'string') {
    return request;
  } else {
    return new URL(request.url).pathname;
  }
}
