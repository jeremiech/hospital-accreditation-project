import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const admissionApi = createApi({
  reducerPath: "admission-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/admission",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAdmissions: builder.query({
      query: ({ skip, limit, id }) => ({
        url: `?skip=${skip}&limit=${limit}${id && "&filter=" + id}`,
        method: "GET",
      }),
    }),
    getAdmission: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addAdmission: builder.mutation({
      query: ({
        hasFled,
        patient,
        isImproved,
        referredTo,
        isRecovered,
        isUnimproved,
        diedAfter48hr,
        admissionDate,
        dischargeDate,
        diedBefore48hr,
        otherDiagnosis,
        finalDiagnosis,
        modeOfAdmission,
        clinicalSummary,
        transferredFrom,
        wasAutopsyRequested,
        investigationSummary,
      }) => ({
        url: "",
        method: "POST",
        body: {
          hasFled,
          patient,
          isImproved,
          referredTo,
          isRecovered,
          isUnimproved,
          diedAfter48hr,
          admissionDate,
          dischargeDate,
          diedBefore48hr,
          otherDiagnosis,
          finalDiagnosis,
          modeOfAdmission,
          clinicalSummary,
          transferredFrom,
          wasAutopsyRequested,
          investigationSummary,
        },
      }),
    }),
    editAdmission: builder.mutation({
      query: ({
        id,
        hasFled,
        patient,
        isImproved,
        referredTo,
        isRecovered,
        isUnimproved,
        diedAfter48hr,
        admissionDate,
        dischargeDate,
        diedBefore48hr,
        otherDiagnosis,
        finalDiagnosis,
        modeOfAdmission,
        clinicalSummary,
        transferredFrom,
        wasAutopsyRequested,
        investigationSummary,
      }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          hasFled,
          patient,
          isImproved,
          referredTo,
          isRecovered,
          isUnimproved,
          diedAfter48hr,
          admissionDate,
          dischargeDate,
          diedBefore48hr,
          otherDiagnosis,
          finalDiagnosis,
          modeOfAdmission,
          clinicalSummary,
          transferredFrom,
          wasAutopsyRequested,
          investigationSummary,
        },
      }),
    }),
    deleteAdmission: builder.mutation({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetAdmissionQuery,
  useGetAdmissionsQuery,
  useAddAdmissionMutation,
  useEditAdmissionMutation,
  useDeleteAdmissionMutation,
} = admissionApi;
