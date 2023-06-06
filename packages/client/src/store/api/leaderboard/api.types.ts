import type { Api, EndpointDefinitions } from '@reduxjs/toolkit/dist/query';
import { apiSliceBase } from '../api.slice-base';

export type { EndpointDefinitions };

export type ExtendedAPISlice<Definitions extends EndpointDefinitions> = Api<
  ApiBaseGenerics['BaseQuery'],
  Definitions,
  ApiBaseGenerics['ReducerPath'],
  ApiBaseGenerics['TagTypes'],
  ApiBaseGenerics['Enhancers']
>;

type ApiBaseGenerics = ExtractApiGenerics<typeof apiSliceBase>;

export type ExtractApiGenerics<T> = T extends Api<
  infer BaseQuery,
  infer Definitions,
  infer ReducerPath,
  infer TagTypes,
  infer Enhancers
>
  ? {
      BaseQuery: BaseQuery;
      Definitions: Definitions;
      ReducerPath: ReducerPath;
      TagTypes: TagTypes;
      Enhancers: Enhancers;
    }
  : undefined;
