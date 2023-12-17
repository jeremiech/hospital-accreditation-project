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
      query: ({ skip, limit }) => ({
        url: `?skip=${skip}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getAnesthesia: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addAnesthesia: builder.mutation({
      query: ({
        modeOfAnesthesia,
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
        AnesthesiaDate,
        dischargeDate,
        finalDiagnosis,
      }) => ({
        url: "",
        method: "POST",
        body: {
          modeOfAnesthesia,
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
          AnesthesiaDate,
          dischargeDate,
          finalDiagnosis,
        },
      }),
    }),
    editAnesthesia: builder.mutation({
      query: ({
        id,
        modeOfAnesthesia,
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
        AnesthesiaDate,
        dischargeDate,
        finalDiagnosis,
      }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          modeOfAnesthesia,
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
          AnesthesiaDate,
          dischargeDate,
          finalDiagnosis,
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
