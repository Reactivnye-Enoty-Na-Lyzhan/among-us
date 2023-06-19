import {
  HandlerWithEnsuredResponse,
  HandlerWithUnsureResponse,
  RequestHandler,
  RequestHandlerArgs,
} from './_service-worker.types';
import { CacheHandler } from './cache-handler';
import { getURL, isStaticFileRequest } from './helpers';

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

    this.getResponseFromNavigationPreload = this._withResponseCaching(
      this.getResponseFromNavigationPreload
    );
    this.getResponseFromNetwork = this._withResponseCaching(
      this.getResponseFromNetwork
    );
  }

  getResponseFromCache: HandlerWithUnsureResponse = async ({
    request,
  }: RequestHandlerArgs) => {
    const responseFromCache = await this._cacheHandler.getFromCache(request);

    if (responseFromCache) {
      console.log(`RESPONSE ON '${getURL(request)}' RECEIVED FROM CACHE`);
    }

    return responseFromCache;
  };

  getResponseFromNavigationPreload: HandlerWithUnsureResponse = async ({
    request,
    preloadResponse,
  }: RequestHandlerArgs) => {
    try {
      const response = await preloadResponse;

      if (response) {
        console.log(
          `RESPONSE ON '${getURL(request)}' RECEIVED FROM NAVIGATION PRELOADED`
        );
      }

      return response;
    } catch (error) {
      console.error(
        `FAILED TO GET RESPONSE ON '${getURL(
          request
        )} 'FROM NAVIGATION PRELOADED\n ERROR: ${error}`
      );
    }
  };

  getResponseFromNetwork: HandlerWithUnsureResponse = async ({
    request,
  }: RequestHandlerArgs) => {
    try {
      const responseFromNetwork = await fetch(request);
      console.info(`RESPONSE ON '${getURL(request)}' RECEIVED FROM NETWORK`);
      return responseFromNetwork;
    } catch (error) {
      console.error(
        `FAILED TO GET RESPONSE ON '${getURL(
          request
        )} 'FROM NETWORK\n ERROR: ${error}`
      );
    }
  };

  private async _getOfflineResponse() {
    let response: Response | undefined;

    if (this._offlineFallbackURL) {
      response = await this.getResponseFromCache({
        request: this._offlineFallbackURL,
      });
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
    requestHandler: HandlerWithUnsureResponse
  ): HandlerWithEnsuredResponse {
    return async handlerArgs => {
      const response = await requestHandler(handlerArgs);

      if (!response) {
        return this._getOfflineResponse();
      }

      return response;
    };
  }

  private _withResponseCaching =
    (requestHandler: RequestHandler): RequestHandler =>
    async (handlerArgs: RequestHandlerArgs) => {
      const response = await requestHandler(handlerArgs);
      const { request } = handlerArgs;

      const shouldCache =
        isStaticFileRequest(request) && response?.status === 200;
      if (shouldCache) {
        await this._cacheHandler.putInCache({
          request: handlerArgs.request,
          response: response.clone(),
        });
      }

      return response;
    };
}
