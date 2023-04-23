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
    }\n`;
    logString += `PUT REQUEST '${getURL(request)}' TO CACHE ${this._cacheName}`;

    try {
      await cache.put(request, response);
    } catch (error) {
      logString += `FAILED WITH ERROR: ${error}`;
    }

    console.log(logString);
  }

  private static async _deleteCache(cacheToDelete: string) {
    console.log(`DELETE CACHE ${cacheToDelete}`);
    try {
      await caches.delete(cacheToDelete);
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
