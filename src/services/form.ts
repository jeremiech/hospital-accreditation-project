import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formApi = createApi({
  reducerPath: "form-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/form",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getForms: builder.query({
      query: ({ skip, limit }) => ({
        url: `?skip=${skip}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getForm: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addForm: builder.mutation({
      query: ({ name, description, fields }) => ({
        url: "",
        method: "POST",
        body: { name, description, fields },
      }),
    }),
    editForm: builder.mutation({
      query: ({ id, name, description, fields }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { name, description, fields },
      }),
    }),
    deleteForm: builder.mutation({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetFormQuery,
  useGetFormsQuery,
  useAddFormMutation,
  useEditFormMutation,
  useDeleteFormMutation,
} = formApi;
