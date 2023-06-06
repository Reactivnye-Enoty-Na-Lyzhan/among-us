export function getURL(request: RequestInfo): string {
  if (typeof request === 'string') {
    return request;
  } else {
    return new URL(request.url).pathname;
  }
}

export const isStaticFileRequest = (() => {
  const cache: Record<string, boolean> = {};

  const imageExtensions = new Set(['png', 'svg']);
  const isImage = (ext: string) => {
    return imageExtensions.has(ext);
  };

  const fontExtensions = new Set(['woff', 'woff2']);
  const isFont = (ext: string) => {
    return fontExtensions.has(ext);
  };

  return function (request: Request | string): boolean {
    let url: string;
    if (typeof request === 'string') {
      url = request;
    } else {
      url = request.url;
    }

    const fileExtensionRegexMatch = url.match(/\.(\w+)$/);
    if (!fileExtensionRegexMatch) {
      return false;
    }

    const fileExtension = fileExtensionRegexMatch[1];
    const result = [isImage, isFont].some(isStaticFile =>
      isStaticFile(fileExtension)
    );
    cache[url] = result;

    return result;
  };
})();
