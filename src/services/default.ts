import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const defaultApi = createApi({
  reducerPath: "default-api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () => ({ url: "/metrics", method: "GET" }),
    }),
    getReport: builder.query({
      query: () => ({ url: "/report", method: "GET" }),
    }),
    attemptSeed: builder.query({
      query: () => ({ url: "/seed", method: "GET" }),
    }),
  }),
});

export const { useGetMetricsQuery, useGetReportQuery, useAttemptSeedQuery } =
  defaultApi;