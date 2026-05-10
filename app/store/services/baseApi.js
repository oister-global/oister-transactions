import { createApi } from "@reduxjs/toolkit/query/react";
import { buildCustomFetchBaseQuery } from "./buildCustomFetchBaseQuery.js";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: buildCustomFetchBaseQuery({
    baseUrl: "http://192.168.1.6:3000",
  }),
  tagTypes: ["Transactions"],
  endpoints: () => ({}),
});
