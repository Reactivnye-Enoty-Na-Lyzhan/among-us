import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';
import { ForumMessageType, ForumPostType } from './forum.types';

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
    getPostData: build.query<ForumPostType, { postId: number }>({
      query: ({ postId }) => ({
        url: `forum/posts/${postId}`,
        method: 'GET',
      }),
    }),
    createPost: build.mutation<ForumPostType, { title: string; text: string }>({
      query: ({ title, text }) => ({
        url: `forum/posts`,
        method: 'POST',
        body: { title, text },
      }),
    }),
    updatePost: build.mutation<ForumPostType, ForumPostType>({
      query: data => ({
        url: `forum/posts`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePost: build.mutation<ForumMessageType, { postId: number }>({
      query: ({ postId }) => ({
        url: `forum/posts/${postId}`,
        method: 'DELETE',
      }),
    }),
    getMessagesData: build.query<ForumMessageType[], { postId: number }>({
      query: ({ postId }) => ({
        url: `forum/messages/${postId}`,
        method: 'GET',
      }),
    }),
    createMessage: build.mutation<
      ForumMessageType[],
      { postId: number; text: string }
    >({
      query: ({ postId, text }) => ({
        url: `forum/messages`,
        method: 'POST',
        body: { postId, text },
      }),
    }),
  }),
});

export const {
  useGetPostsDataQuery,
  useGetPostDataQuery,
  useGetMessagesDataQuery,
  useCreateMessageMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = forumApi;
