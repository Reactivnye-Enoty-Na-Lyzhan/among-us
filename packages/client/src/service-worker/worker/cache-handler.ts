import { getURL } from './helpers';

export class CacheHandler {
  private readonly _cacheName: string;

  constructor(cacheName: string) {
    this._cacheName = cacheName;
  }

  async addResourcesToCache(resources: RequestInfo[]) {
    const cache = await caches.open(this._cacheName);
    try {
      await cache.addAll(resources);
    } catch (error) {
      console.error(
        `FAILED TO ADD ALL ${JSON.stringify(
          resources
        )} RESOURCES TO CACHE: ${error}`
      );
    }
  }

  async putInCache({
    request,
    response,
  }: {
    request: RequestInfo;
    response: Response;
  }) {
    const cache = await caches.open(this._cacheName);
    let logString = `NETWORK REQUEST: ${getURL(request)}; STATUS: ${
      response.status
    }\nPUT REQUEST '${getURL(request)}' TO CACHE ${this._cacheName}`;

    try {
      await cache.put(request, response);
    } catch (error) {
      logString += `FAILED WITH ERROR: ${error}`;
    }

    console.log(logString);
  }

  async getFromCache(request: RequestInfo) {
    try {
      const cache = await caches.open(this._cacheName);
      const responseFromCache = await cache.match(request);

      return responseFromCache;
    } catch (error) {
      console.error(
        `FAILED TO GET RESPONSE ON '${getURL(
          request
        )} 'FROM CACHE\n ERROR: ${error}`
      );
    }
  }

  private static async _deleteCache(cacheToDelete: string) {
    try {
      await caches.delete(cacheToDelete);
      console.log(`CACHE DELETED  ${cacheToDelete}`);
    } catch (error) {
      console.error(`FAILED TO DELETE CACHE ${cacheToDelete}: ${error}`);
    }
  }

  async deleteOldCaches({ keepList } = { keepList: [this._cacheName] }) {
    const cachesKeysList = await caches.keys();
    console.log(`CASHES: ${JSON.stringify(cachesKeysList)}`);
    const cachesToDelete = cachesKeysList.filter(
      key => !keepList.includes(key)
    );
    console.log(`DELETE OLD CACHES ${JSON.stringify(cachesToDelete)}`);
    await Promise.all(cachesToDelete.map(CacheHandler._deleteCache));
  }

  getCacheName() {
    return this._cacheName;
  }
}
