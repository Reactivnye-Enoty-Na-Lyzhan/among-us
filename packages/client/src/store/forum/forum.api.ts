import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';
import { ForumPostType } from './forum.types';

export const forumApi = createApi({
  reducerPath: 'forum/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: build => ({
    getPostsData: build.query<ForumPostType[], void>({
      query: () => `forum/posts`,
    }),
  }),
});

export const { useGetPostsDataQuery } = forumApi;
