export type RequestHandlerArgs = {
  request: RequestInfo;
  preloadResponse?: PreloadResponse;
};

export type PreloadResponse = Promise<Response | undefined>;

type TRequestHandler<ResponseType extends Response | undefined> = ({
  request,
  preloadResponse,
}: RequestHandlerArgs) => Promise<ResponseType>;

export type HandlerWithEnsuredResponse = TRequestHandler<Response>;
export type HandlerWithUnsureResponse = TRequestHandler<Response | undefined>;
export type RequestHandler =
  | HandlerWithEnsuredResponse
  | HandlerWithUnsureResponse;
