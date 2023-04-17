export const request = {
  post({ url, data }: { url: string; data: Record<string, string | number> }) {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    return fetch(url, requestOptions);
  },
};
