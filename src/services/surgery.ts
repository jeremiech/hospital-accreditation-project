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
      query: ({ skip, limit }) => ({
        url: `?skip=${skip}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getSurgery: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addSurgery: builder.mutation({
      query: ({
        modeOfSurgery,
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
        SurgeryDate,
        dischargeDate,
        finalDiagnosis,
      }) => ({
        url: "",
        method: "POST",
        body: {
          modeOfSurgery,
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
          SurgeryDate,
          dischargeDate,
          finalDiagnosis,
        },
      }),
    }),
    editSurgery: builder.mutation({
      query: ({
        id,
        modeOfSurgery,
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
        SurgeryDate,
        dischargeDate,
        finalDiagnosis,
      }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          modeOfSurgery,
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
          SurgeryDate,
          dischargeDate,
          finalDiagnosis,
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
