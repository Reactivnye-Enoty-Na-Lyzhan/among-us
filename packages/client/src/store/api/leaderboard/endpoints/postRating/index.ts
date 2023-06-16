import { API_PATH } from '@-constants/leaderboard/api.constants';
import { jsonOtherwiseTextHandler } from '@/utils/api/response-handlers';
import type { EndpointDefinitions, ExtendedAPISlice } from '../../api.types';
import type {
  PostRatingRequestArgs,
  PostRatingRequestDTO,
  PostRatingSuccessfulResponse,
} from './types';

function postRatingQuery(ratingData: PostRatingRequestArgs) {
  const requestDTO: PostRatingRequestDTO = {
    data: {
      ...ratingData,
    },
  };

  return {
    url: API_PATH,
    method: 'POST',
    body: requestDTO,
    responseHandler: jsonOtherwiseTextHandler,
  };
}

export function injectPostRatingEndpoint<
  InputDefinitions extends EndpointDefinitions
>(apiSlice: ExtendedAPISlice<InputDefinitions>) {
  const extendedAPI = apiSlice.injectEndpoints({
    endpoints: build => ({
      postRating: build.mutation<
        PostRatingSuccessfulResponse,
        PostRatingRequestArgs
      >({
        query: postRatingQuery,
      }),
    }),
  });

  return extendedAPI;
}
