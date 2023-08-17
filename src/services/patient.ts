import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
  reducerPath: "patient-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/patient",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: ({ page, rowsPerPage, sortBy }) => ({
        url: `?page=${page + 1}&limit=${rowsPerPage}&sortBy=${sortBy}`,
        method: "GET",
      }),
    }),
    getPatient: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addPatient: builder.mutation({
      query: ({ name, role, password, email }) => ({
        url: "",
        method: "POST",
        body: { name, role, password, email },
      }),
    }),
    editPatient: builder.mutation({
      query: ({ id, name, role, password, email }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { name, role, password, email },
      }),
    }),
    deletePatient: builder.mutation({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetPatientQuery,
  useGetPatientsQuery,
  useAddPatientMutation,
  useEditPatientMutation,
  useDeletePatientMutation,
} = patientApi;
