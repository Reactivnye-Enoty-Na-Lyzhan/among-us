export const redirectByUrl = (url: string) => {
  if (url.length) {
    location.assign(url);
  }
};
