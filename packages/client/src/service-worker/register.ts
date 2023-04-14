export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const serviceWorker = await navigator.serviceWorker.register(
        '/service-worker.js',
        {
          scope: '/',
        }
      );
      if (serviceWorker.installing) {
        console.log('Service worker installing');
      } else if (serviceWorker.waiting) {
        console.log('Service worker installed');
      } else if (serviceWorker.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
