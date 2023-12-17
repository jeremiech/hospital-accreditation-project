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
      query: ({ skip, limit }) => ({
        url: `?skip=${skip}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getPatient: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addPatient: builder.mutation({
      query: ({
        modeOfAdmission,
        transferredFrom,
        isRecovered,
        isImproved,
        isUnimproved,
        diedAfter48hr,
        diedBefore48hr,
        wasAutopsyRequested,
        hasFled,
        clinicalSummary,
        investigationSummary,
        otherDiagnosis,
        referredTo,
        admissionDate,
        dischargeDate,
        finalDiagnosis,
      }) => ({
        url: "",
        method: "POST",
        body: {
          modeOfAdmission,
          transferredFrom,
          isRecovered,
          isImproved,
          isUnimproved,
          diedAfter48hr,
          diedBefore48hr,
          wasAutopsyRequested,
          hasFled,
          clinicalSummary,
          investigationSummary,
          otherDiagnosis,
          referredTo,
          admissionDate,
          dischargeDate,
          finalDiagnosis,
        },
      }),
    }),
    editPatient: builder.mutation({
      query: ({
        id,
        modeOfAdmission,
        transferredFrom,
        isRecovered,
        isImproved,
        isUnimproved,
        diedAfter48hr,
        diedBefore48hr,
        wasAutopsyRequested,
        hasFled,
        clinicalSummary,
        investigationSummary,
        otherDiagnosis,
        referredTo,
        admissionDate,
        dischargeDate,
        finalDiagnosis,
      }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          modeOfAdmission,
          transferredFrom,
          isRecovered,
          isImproved,
          isUnimproved,
          diedAfter48hr,
          diedBefore48hr,
          wasAutopsyRequested,
          hasFled,
          clinicalSummary,
          investigationSummary,
          otherDiagnosis,
          referredTo,
          admissionDate,
          dischargeDate,
          finalDiagnosis,
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
