import { baseApi } from "./baseApi";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/transactions",
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
