import { createApi } from "@reduxjs/toolkit/query/react";
import { buildCustomFetchBaseQuery } from "./buildCustomFetchBaseQuery.js";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: buildCustomFetchBaseQuery({
    baseUrl: "https://api-dev.oisterglobal.com",
  }),
  tagTypes: ["Transactions"],
  endpoints: () => ({}),
});
