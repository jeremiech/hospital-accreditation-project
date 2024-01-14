import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/user",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ skip, limit, role = "" }) => ({
        url: `?skip=${skip}&limit=${limit}&role=${role}`,
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addUser: builder.mutation({
      query: ({ name, bio, role, image, email, contact, patient }) => ({
        url: "",
        method: "POST",
        body: { name, bio, role, image, email, contact, patient },
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, name, bio, role, image, email, contact, patient }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { name, bio, role, image, email, contact, patient },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
