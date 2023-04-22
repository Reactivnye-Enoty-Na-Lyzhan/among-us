import { getURL } from './helpers';

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
  deleteOldCaches: (options?: { keepList: string[] }) => Promise<void>;
};

export function makeCacheHandler(cacheName: string): CacheHandler {
  const addResourcesToCache: CacheHandler['addResourcesToCache'] =
    async resources => {
      const cache = await caches.open(cacheName);
      try {
        await cache.addAll(resources);
      } catch (error) {
        console.error(
          `FAILED TO ADD ALL ${JSON.stringify(
            resources
          )} RESOURCES TO CACHE: ${error}`
        );
      }
    };

  const putInCache: CacheHandler['putInCache'] = async ({
    request,
    response,
  }) => {
    const cache = await caches.open(cacheName);
    let logString = `NETWORK REQUEST: ${getURL(request)}; STATUS: ${
      response.status
    }\n`;
    logString += `PUT REQUEST '${getURL(request)}' TO CACHE ${cacheName}`;

    try {
      await cache.put(request, response);
    } catch (error) {
      logString += `FAILED WITH ERROR: ${error}`;
    }

    console.log(logString);
  };

  const deleteCache: CacheHandler['deleteCache'] = async (
    cacheToDelete: string
  ) => {
    console.log(`DELETE CACHE ${cacheToDelete}`);
    try {
      await caches.delete(cacheToDelete);
    } catch (error) {
      console.error(`FAILED TO DELETE CACHE ${cacheToDelete}: ${error}`);
    }
  };

  const deleteOldCaches: CacheHandler['deleteOldCaches'] = async (
    { keepList } = { keepList: [cacheName] }
  ) => {
    const cachesKeysList = await caches.keys();
    console.log(`CASHES: ${JSON.stringify(cachesKeysList)}`);
    const cachesToDelete = cachesKeysList.filter(
      key => !keepList.includes(key)
    );
    console.log(`DELETE OLD CACHES ${JSON.stringify(cachesToDelete)}`);
    await Promise.all(cachesToDelete.map(deleteCache));
  };

  return {
    addResourcesToCache,
    putInCache,
    deleteCache,
    deleteOldCaches,
  };
}
