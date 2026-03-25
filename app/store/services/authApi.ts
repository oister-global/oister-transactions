import { baseApi } from "./baseApi";

type SendOtpRequest = {
  email: string;
};

type VerifyOtpRequest = {
  email: string;
  otp: string;
};

type AuthResponse = {
  success: boolean;
  message?: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<AuthResponse, SendOtpRequest>({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = authApi;
