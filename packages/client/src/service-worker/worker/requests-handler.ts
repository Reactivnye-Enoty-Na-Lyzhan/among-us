import type { CachedRequestsHandler, RequestHandler } from './cache-strategies';

export class SWRequest {
  private readonly _requestHandler: CachedRequestsHandler;
  cacheFirst: RequestHandler;
  networkFirst: RequestHandler;

  constructor(requestHandler: CachedRequestsHandler) {
    this._requestHandler = requestHandler;

    this.cacheFirst = this._createRequestHandler([
      requestHandler.getResponseFromCache,
      requestHandler.getAndCacheNetworkResponse,
    ]);

    this.networkFirst = this._createRequestHandler([
      requestHandler.getAndCacheNetworkResponse,
      requestHandler.getResponseFromCache,
    ]);
  }

  private _createRequestHandler(
    handlers: RequestHandler<Response | undefined>[]
  ) {
    const requestHandler = async (request: RequestInfo) => {
      let response: Response | undefined;

      handlers.some(async handler => {
        response = await handler(request);
        return response;
      });

      return response;
    };

    return this._requestHandler.withOfflineResponse(requestHandler);
  }
}
