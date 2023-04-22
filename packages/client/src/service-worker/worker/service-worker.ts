import { makeCacheHandler } from './cache-handler';
import { getURL } from './helpers';

const sw: ServiceWorkerGlobalScope = self as any;

const CACHE_NAME = 'ws-cache-v1';
const URLS_TO_CACHE = ['/', '/offline.html'];

const cacheHandler = makeCacheHandler(CACHE_NAME);

sw.addEventListener('install', event => {
  console.log('SERVICE WORKER INSTALL');
  event.waitUntil(cacheHandler.addResourcesToCache(URLS_TO_CACHE));
});

sw.addEventListener('activate', event => {
  console.log('SERVICE WORKER ACTIVATE');
  event.waitUntil(cacheHandler.deleteOldCaches({ keepList: [CACHE_NAME] }));
});

const getResponseFromCache = async (request: RequestInfo) => {
  const responseFromCache = await caches.match(request);

  if (responseFromCache) {
    console.log(`REQUEST '${getURL(request)}' FOUND IN CACHE`);
    return responseFromCache;
  }
};

const getAndCacheResponseFromNetwork = async (request: RequestInfo) => {
  try {
    const responseFromNetwork = await fetch(request);

    if (responseFromNetwork.status === 200) {
      cacheHandler.putInCache({
        request,
        response: responseFromNetwork.clone(),
      });
    }

    return responseFromNetwork;
  } catch (error) {
    const logString = `FAILED TO GET RESPONSE ON '${getURL(
      request
    )} 'FROM NETWORK WITH ERROR: ${error}`;
    console.error(logString);
  }
};

const getOfflineResponse = async () => {
  const offlinePage = await caches.match('/offline.html');
  return offlinePage;
};

type TRequestHandler<TResponse extends Response | undefined = Response> = (
  request: RequestInfo
) => Promise<TResponse>;

function withOfflineResponse(
  strategy: TRequestHandler<Response | undefined>
): TRequestHandler {
  return async request => {
    const response = await strategy(request);
    if (!response) {
      const responseOffline = await getOfflineResponse();
      return responseOffline ?? new Response();
    }

    return response;
  };
}

const cacheFirst = withOfflineResponse(async (request: RequestInfo) => {
  const responseFromCache = await getResponseFromCache(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const responseFromNetwork = await getAndCacheResponseFromNetwork(request);
  if (responseFromNetwork) {
    return responseFromNetwork;
  }
});

const networkFirst = withOfflineResponse(async (request: RequestInfo) => {
  const responseFromNetwork = await getAndCacheResponseFromNetwork(request);
  if (responseFromNetwork) {
    return responseFromNetwork;
  }

  const responseFromCache = await getResponseFromCache(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const responseOffline = await getOfflineResponse();
  return responseOffline ?? new Response();
});

const cacheStrategies = {
  cacheFirst,
  networkFirst,
};

sw.addEventListener('fetch', event => {
  event.respondWith(cacheStrategies.networkFirst(event.request));
});
