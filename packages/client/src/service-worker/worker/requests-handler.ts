import {
  HandlerWithEnsuredResponse,
  HandlerWithUnsureResponse,
} from './_service-worker.types';
import type { CachedRequestsHandler } from './cache-strategies';

export class SWRequest {
  private readonly _requestHandler: CachedRequestsHandler;
  cacheFirst: HandlerWithEnsuredResponse;
  networkFirst: HandlerWithEnsuredResponse;

  constructor(requestHandler: CachedRequestsHandler) {
    this._requestHandler = requestHandler;

    this.cacheFirst = this._createRequestHandler([
      requestHandler.getResponseFromCache,
      requestHandler.getResponseFromNavigationPreload,
      requestHandler.getResponseFromNetwork,
    ]);

    this.networkFirst = this._createRequestHandler([
      requestHandler.getResponseFromNavigationPreload,
      requestHandler.getResponseFromNetwork,
      requestHandler.getResponseFromCache,
    ]);
  }

  private _createRequestHandler(
    handlers: HandlerWithUnsureResponse[]
  ): HandlerWithEnsuredResponse {
    const requestHandler = async ({
      request,
      preloadResponse,
    }: {
      request: RequestInfo;
      preloadResponse?: Promise<Response | undefined>;
    }) => {
      let response: Response | undefined;

      for (const handler of handlers) {
        response = await handler({ request, preloadResponse });
        if (response) break;
      }

      return response;
    };

    return this._requestHandler.withOfflineResponse(requestHandler);
  }
}
