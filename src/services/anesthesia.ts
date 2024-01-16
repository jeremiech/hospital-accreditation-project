import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const anesthesiaApi = createApi({
  reducerPath: "anesthesia-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/anesthesia",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAnesthesias: builder.query({
      query: ({ skip, limit, id }) => ({
        url: `?skip=${skip}&limit=${limit}${id && "&filter=" + id}`,
        method: "GET",
      }),
    }),
    getAnesthesia: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addAnesthesia: builder.mutation({
      query: ({
        date,
        agreed,
        patient,
        witness,
        sideEffect,
        anesthesist,
        patientQuestion,
        operationDetails,
        authorizingPerson,
      }) => ({
        url: "",
        method: "POST",
        body: {
          date,
          agreed,
          patient,
          witness,
          sideEffect,
          anesthesist,
          patientQuestion,
          operationDetails,
          authorizingPerson,
        },
      }),
    }),
    editAnesthesia: builder.mutation({
      query: ({
        id,
        date,
        agreed,
        patient,
        witness,
        sideEffect,
        anesthesist,
        patientQuestion,
        operationDetails,
        authorizingPerson,
      }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          date,
          agreed,
          patient,
          witness,
          sideEffect,
          anesthesist,
          patientQuestion,
          operationDetails,
          authorizingPerson,
        },
      }),
    }),
    deleteAnesthesia: builder.mutation({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetAnesthesiaQuery,
  useGetAnesthesiasQuery,
  useAddAnesthesiaMutation,
  useEditAnesthesiaMutation,
  useDeleteAnesthesiaMutation,
} = anesthesiaApi;
