import { CacheHandler } from './cache-handler';
import { getURL } from './helpers';

export type RequestHandler<
  ResponseType extends Response | undefined = Response
> = (request: RequestInfo) => Promise<ResponseType>;

export class CachedRequestsHandler {
  private readonly _cacheName: string;
  private readonly _offlineFallbackURL: string | undefined;
  private readonly _cacheHandler: CacheHandler;

  constructor({
    cacheNameOrHandler,
    offlineFallbackURL,
  }: {
    cacheNameOrHandler: string | CacheHandler;
    offlineFallbackURL?: string;
  }) {
    if (typeof cacheNameOrHandler === 'string') {
      this._cacheName = cacheNameOrHandler;
      this._cacheHandler = new CacheHandler(cacheNameOrHandler);
    } else {
      this._cacheName = cacheNameOrHandler.getCacheName();
      this._cacheHandler = cacheNameOrHandler;
    }

    this._offlineFallbackURL = offlineFallbackURL;
  }

  async getResponseFromCache(request: RequestInfo) {
    const cache = await caches.open(this._cacheName);
    const responseFromCache = await cache.match(request);

    if (responseFromCache) {
      console.log(`REQUEST '${getURL(request)}' FOUND IN CACHE`);
    }

    return responseFromCache;
  }

  async getAndCacheNetworkResponse(request: RequestInfo) {
    try {
      const responseFromNetwork = await fetch(request);

      if (responseFromNetwork.status === 200) {
        this._cacheHandler.putInCache({
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
  }

  private async _getOfflineResponse() {
    let response: Response | undefined;

    if (this._offlineFallbackURL) {
      response = await this.getResponseFromCache(this._offlineFallbackURL);
    }
    if (!response) {
      response = new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    return response;
  }

  withOfflineResponse(
    requestHandler: RequestHandler<Response | undefined>
  ): RequestHandler {
    return async request => {
      const response = await requestHandler(request);

      if (!response) {
        return this._getOfflineResponse();
      }

      return response;
    };
  }
}
