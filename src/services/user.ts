import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/users",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, rowsPerPage, sortBy }) => ({
        url: `?page=${page + 1}&limit=${rowsPerPage}&sortBy=${sortBy}`,
        method: "GET",
      }),
    }),
    getTeachers: builder.query({
      query: ({ page, rowsPerPage, sortBy, role = "teacher" }) => ({
        url: `/role/${role}?page=${
          page + 1
        }&limit=${rowsPerPage}&sortBy=${sortBy}`,
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addUser: builder.mutation({
      query: ({ name, role, password, email }) => ({
        url: "",
        method: "POST",
        body: { name, role, password, email },
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, name, role, password, email }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { name, role, password, email },
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
  useGetTeachersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
