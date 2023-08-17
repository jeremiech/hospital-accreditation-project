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
      query: ({
        dob,
        phone,
        father,
        mother,
        passport,
        lastName,
        religion,
        firstName,
        nationalID,
        occupation,
        nationality,
        hasInsurance,
        maritalStatus,
        insuranceType,
        insuranceNumber,
        contactPersonName,
        contactPersonPhone,
      }) => ({
        url: "",
        method: "POST",
        body: {
          dob,
          phone,
          father,
          mother,
          passport,
          lastName,
          religion,
          firstName,
          nationalID,
          occupation,
          nationality,
          hasInsurance,
          maritalStatus,
          insuranceType,
          insuranceNumber,
          contactPersonName,
          contactPersonPhone,
        },
      }),
    }),
    editPatient: builder.mutation({
      query: ({
        id,
        dob,
        phone,
        father,
        mother,
        passport,
        lastName,
        religion,
        firstName,
        nationalID,
        occupation,
        nationality,
        hasInsurance,
        maritalStatus,
        insuranceType,
        insuranceNumber,
        contactPersonName,
        contactPersonPhone,
      }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          dob,
          phone,
          father,
          mother,
          passport,
          lastName,
          religion,
          firstName,
          nationalID,
          occupation,
          nationality,
          hasInsurance,
          maritalStatus,
          insuranceType,
          insuranceNumber,
          contactPersonName,
          contactPersonPhone,
        },
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
