import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
  reducerPath: "message-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/message",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ skip, limit, type }) => ({
        url: `?skip=${skip}&limit=${limit}&type=${type}`,
        method: "GET",
      }),
    }),
    getMessage: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addMessage: builder.mutation({
      query: ({ content, recipient }) => ({
        url: "",
        method: "POST",
        body: { content, recipient },
      }),
    }),
    editMessage: builder.mutation({
      query: ({ id, content, recipient }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { content, recipient },
      }),
    }),
    deleteMessage: builder.mutation({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetMessageQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
