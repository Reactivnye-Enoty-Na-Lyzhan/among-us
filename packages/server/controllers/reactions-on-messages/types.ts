import type { NextFunction, Request, Response } from 'express';
import { SUCCESSFUL_RESPONSE } from './constants';

type EmptyRecord = { [key in never]: any };
type ParamsRecord = Record<string, string>;
type BodyRecord = Record<string, string | number>;

export type RequestType<
  Params extends ParamsRecord = EmptyRecord,
  Body extends BodyRecord = EmptyRecord
> = Request<Params, any, Body>;

export type WithoutParamsRequest<Body extends BodyRecord = EmptyRecord> =
  RequestType<EmptyRecord, Body>;

export type WithoutBodyRequest<Params extends ParamsRecord = EmptyRecord> =
  RequestType<Params>;

export type ResponseType = Response<
  typeof SUCCESSFUL_RESPONSE | { reason: string }
>;

export type RequestsHandler<RequestType extends Request = Request> = (
  request: RequestType,
  response: ResponseType,
  next: NextFunction
) => Promise<void>;
