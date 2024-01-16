import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const surgeryApi = createApi({
  reducerPath: "surgery-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/surgery",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSurgeries: builder.query({
      query: ({ skip, limit, id }) => ({
        url: `?skip=${skip}&limit=${limit}${id ? "&filter=" + id : ""}`,
        method: "GET",
      }),
    }),
    getSurgery: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addSurgery: builder.mutation({
      query: ({
        date,
        patient,
        witness,
        nextOfKin,
        doctor,
        operationDetails,
        authorizingPerson,
      }) => ({
        url: "",
        method: "POST",
        body: {
          date,
          patient,
          witness,
          nextOfKin,
          doctor,
          operationDetails,
          authorizingPerson,
        },
      }),
    }),
    editSurgery: builder.mutation({
      query: ({
        id,
        date,
        patient,
        witness,
        nextOfKin,
        doctor,
        operationDetails,
        authorizingPerson,
      }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          date,
          patient,
          witness,
          nextOfKin,
          doctor,
          operationDetails,
          authorizingPerson,
        },
      }),
    }),
    deleteSurgery: builder.mutation({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetSurgeryQuery,
  useGetSurgeriesQuery,
  useAddSurgeryMutation,
  useEditSurgeryMutation,
  useDeleteSurgeryMutation,
} = surgeryApi;
