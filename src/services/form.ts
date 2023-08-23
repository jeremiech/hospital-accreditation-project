import { CombinedState } from "@/store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formApi = createApi({
  reducerPath: "form-api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "/form",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as CombinedState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getForms: builder.query({
      query: ({ skip, limit }) => ({
        url: `?skip=${skip}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getForm: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    addForm: builder.mutation({
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
        homeAddress,
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
          homeAddress,
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
    editForm: builder.mutation({
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
        homeAddress,
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
          homeAddress,
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
    deleteForm: builder.mutation({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetFormQuery,
  useGetFormsQuery,
  useAddFormMutation,
  useEditFormMutation,
  useDeleteFormMutation,
} = formApi;
