import type { NextFunction, Request, Response } from 'express';
import { SUCCESSFUL_RESPONSE } from '../../controllers/reactions-on-messages/constants';

type EmptyRecord = { [key in never]: any };
type ParamsRecord = Record<string, string>;
type BodyRecord = Record<string, string | number> | BodyRecord[];

type RequestType<
  Params extends ParamsRecord = EmptyRecord,
  RequestBody extends BodyRecord = EmptyRecord
> = Request<Params, any, RequestBody>;
type WithoutParamsRequest<RequestBody extends BodyRecord = EmptyRecord> =
  RequestType<EmptyRecord, RequestBody>;
type WithoutBodyRequest<Params extends ParamsRecord = EmptyRecord> =
  RequestType<Params>;

export type RequestsHandler<
  Req extends Request = Request,
  Res extends Response = Response
> = (request: Req, response: Res, next: NextFunction) => Promise<void>;

type PostResponseType = Response<
  typeof SUCCESSFUL_RESPONSE | { reason: string }
>;
export type PostRequestsHandler<RequestBody extends BodyRecord> =
  RequestsHandler<WithoutParamsRequest<RequestBody>, PostResponseType>;

type GetResponseType<ResponseBody extends BodyRecord = EmptyRecord> =
  Response<ResponseBody>;
export type GetRequestsHandler<
  ResponseBody extends BodyRecord = EmptyRecord,
  Params extends ParamsRecord = EmptyRecord
> = RequestsHandler<WithoutBodyRequest<Params>, GetResponseType<ResponseBody>>;
