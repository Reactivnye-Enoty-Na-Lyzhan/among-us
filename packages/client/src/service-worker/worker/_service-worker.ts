import { CacheHandler } from './cache-handler';
import { CachedRequestsHandler } from './cache-strategies';
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

sw.addEventListener('install', event => {
  console.log('SERVICE WORKER INSTALL');
  event.waitUntil(cacheHandler.addResourcesToCache(URLS_TO_CACHE));
});

sw.addEventListener('activate', event => {
  console.log('SERVICE WORKER ACTIVATE');
  event.waitUntil(cacheHandler.deleteOldCaches());
});

sw.addEventListener('fetch', event => {
  event.respondWith(requestHandler.networkFirst(event.request));
});
