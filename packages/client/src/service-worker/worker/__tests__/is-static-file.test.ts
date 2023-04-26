import { isStaticFileRequest } from '../helpers';

describe('test identifying static file request', () => {
  test('assert woff2 font is static', () => {
    const fontURL = 'my-awesome-website/assets/Inter-Medium-1b498b95.woff2';
    const isStaticFile = isStaticFileRequest(fontURL);

    expect(isStaticFile).toBe(true);
  });

  test('assert .png image is static', () => {
    const fontURL = 'my-awesome-website/assets/stars-wallpaper-7-1f3641eb.png';
    const isStaticFile = isStaticFileRequest(fontURL);

    expect(isStaticFile).toBe(true);
  });

  test('assert .svg image is static', () => {
    const fontURL = 'my-awesome-website/crewman-white-e50c0ff6.svg';
    const isStaticFile = isStaticFileRequest(fontURL);

    expect(isStaticFile).toBe(true);
  });
});
