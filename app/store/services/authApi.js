import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/manager/v1/otp/send",
        method: "POST",
        body,
      }),
      extraOptions: {
        showToastOnSuccess: true,
        showToastOnFailure: true,
      },
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/manager/v1/otp/verify",
        method: "POST",
        body,
      }),
      extraOptions: {
        showToastOnSuccess: true,
        showToastOnFailure: true,
      },
      transformResponse: (apiResponse, meta) => {
        return {
          data: apiResponse.data,
          token: meta?.response?.headers.get("x-auth-token") || null,
        };
      },
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = authApi;
