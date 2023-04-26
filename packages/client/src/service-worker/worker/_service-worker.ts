import { PreloadResponse } from './_service-worker.types';
import { CacheHandler } from './cache-handler';
import { CachedRequestsHandler } from './cache-strategies';
import { isStaticFileRequest } from './helpers';
import { SWRequest } from './requests-handler';

const sw: ServiceWorkerGlobalScope = self as any;

const CACHE_NAME = 'ws-cache-v1';
const OFFLINE_FALLBACK_URL = '/offline.html';
const URLS_TO_CACHE = ['/', OFFLINE_FALLBACK_URL];

const cacheHandler = new CacheHandler(CACHE_NAME);
const requestWithCache = new CachedRequestsHandler({
  cacheNameOrHandler: cacheHandler,
  offlineFallbackURL: OFFLINE_FALLBACK_URL,
});
const requestHandler = new SWRequest(requestWithCache);

sw.addEventListener('install', async event => {
  event.preventDefault();
  await cacheHandler.addResourcesToCache(URLS_TO_CACHE);
  console.log('SERVICE WORKER INSTALLED');
});

const enableNavigationPreload = async () => {
  if (sw.registration.navigationPreload) {
    await sw.registration.navigationPreload.enable();
  }
};
sw.addEventListener('activate', async event => {
  event.preventDefault();
  await cacheHandler.deleteOldCaches();
  await enableNavigationPreload();
  console.log('SERVICE WORKER ACTIVATED');
});

sw.addEventListener('fetch', event => {
  const { request } = event;

  const preloadResponse: PreloadResponse = event.preloadResponse;

  const isStaticFile = isStaticFileRequest(request);

  if (!isStaticFile) {
    event.respondWith(
      requestHandler.networkFirst({ request, preloadResponse })
    );
  } else {
    event.respondWith(requestHandler.cacheFirst({ request, preloadResponse }));
  }
});
