import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { getToken } from "@/app/lib/auth";

export const buildCustomFetchBaseQuery = ({ baseUrl }) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    responseHandler: async (response) => {
      return await response.json();
    },
  });

  return async (args, api, extraOptions = {}) => {
    const result = await baseQuery(args, api, extraOptions);
    const { showToastOnSuccess, showToastOnFailure } = extraOptions;

    // If you want auto-logout on 401, implement it here.

    if (showToastOnFailure && result?.error) {
      toast.error(result?.error?.data?.message || "Something went wrong");
    } else if (showToastOnSuccess && result?.data?.data?.message) {
      toast.success(result.data.data.message || "Success!");
    }

    return result;
  };
};
