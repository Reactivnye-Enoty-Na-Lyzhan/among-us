import type { NextFunction, Request, Response } from 'express';
import type { EmptyRecord } from 'helpers';
import { DEFAULT_SUCCESSFUL_RESPONSE } from '../../utils/constants';

type ParamsRecord = Record<string, string>;
type BodyRecord = Record<string, string | number> | BodyRecord[];
type BodyType = string | BodyRecord;

type DefaultSuccessfulResponse = typeof DEFAULT_SUCCESSFUL_RESPONSE;

type RequestType<
  Params extends ParamsRecord = EmptyRecord,
  RequestBody extends BodyType = EmptyRecord
> = Request<Params, any, RequestBody>;
type WithoutParamsRequest<RequestBody extends BodyType = EmptyRecord> =
  RequestType<EmptyRecord, RequestBody>;
type WithoutBodyRequest<Params extends ParamsRecord = EmptyRecord> =
  RequestType<Params>;

export type RequestsHandler<
  Req extends Request = Request,
  Res extends Response = Response
> = (request: Req, response: Res, next: NextFunction) => Promise<void>;

type PostResponseType<ResponseBody extends BodyType> = Response<ResponseBody>;
export type PostRequestsHandler<
  RequestBody extends BodyType,
  ResponseBody extends BodyType = DefaultSuccessfulResponse
> = RequestsHandler<
  WithoutParamsRequest<RequestBody>,
  PostResponseType<ResponseBody>
>;

type GetResponseType<ResponseBody extends BodyType = EmptyRecord> =
  Response<ResponseBody>;
export type GetRequestsHandler<
  ResponseBody extends BodyType = DefaultSuccessfulResponse,
  Params extends ParamsRecord = EmptyRecord
> = RequestsHandler<WithoutBodyRequest<Params>, GetResponseType<ResponseBody>>;
