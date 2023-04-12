type CacheHandler = {
  addResourcesToCache: (resources: RequestInfo[]) => Promise<void>;
  putInCache: ({
    request,
    response,
  }: {
    request: RequestInfo;
    response: Response;
  }) => Promise<void>;
  deleteCache: (cacheName: string) => Promise<void>;
  deleteOldCaches: ({ keepList }?: { keepList: string[] }) => Promise<void>;
};

function makeCacheHandler(cacheName: string): CacheHandler {
  const addResourcesToCache: CacheHandler['addResourcesToCache'] =
    async resources => {
      const cache = await caches.open(cacheName);
      await cache.addAll(resources);
    };

  const putInCache: CacheHandler['putInCache'] = async ({
    request,
    response,
  }) => {
    const cache = await caches.open(cacheName);
    let logString = `PUT REQUEST '${getURL(request)}' TO CACHE ${cacheName}`;
    await cache.put(request, response).catch(error => {
      logString += `FAILED WITH ERROR: ${error}`;
    });
    console.log(logString);
  };

  const deleteCache: CacheHandler['deleteCache'] = async (
    cacheToDelete: string
  ) => {
    console.log(`DELETE CACHE ${cacheToDelete}`);
    await caches.delete(cacheToDelete);
  };

  const deleteOldCaches: CacheHandler['deleteOldCaches'] = async (
    { keepList } = { keepList: [cacheName] }
  ) => {
    const cachesKeysList = await caches.keys();
    console.log(`CASHES: ${cachesKeysList}`);
    const cachesToDelete = cachesKeysList.filter(
      key => !keepList.includes(key)
    );
    console.log(`DELETE OLD CACHES ${cachesToDelete}`);
    await Promise.all(cachesToDelete.map(deleteCache));
  };

  return {
    addResourcesToCache,
    putInCache,
    deleteCache,
    deleteOldCaches,
  };
}

const getURL = (request: RequestInfo): string => {
  if (typeof request === 'string') {
    return request;
  } else {
    return new URL(request.url).pathname;
  }
};

const sw: ServiceWorkerGlobalScope = self as any;

const CACHE_NAME = 'ws-cache-v1';
const URLS_TO_CACHE = ['/login'];

const cacheHandler = makeCacheHandler(CACHE_NAME);

sw.addEventListener('install', event => {
  console.log('SERVICE WORKER INSTALL');
  event.waitUntil(cacheHandler.addResourcesToCache(URLS_TO_CACHE));
});

sw.addEventListener('activate', event => {
  console.log('SERVICE WORKER ACTIVATE');
  event.waitUntil(cacheHandler.deleteOldCaches({ keepList: [CACHE_NAME] }));
});

const cacheFirst = async (request: RequestInfo) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log(`REQUEST '${getURL(request)}' FOUND IN CACHE`);
    return responseFromCache;
  }

  const responseFromNetwork = await fetch(request);
  cacheHandler.putInCache({
    request,
    response: responseFromNetwork.clone(),
  });
  return responseFromNetwork;
};

sw.addEventListener('fetch', event => {
  event.respondWith(cacheFirst(event.request));
});
