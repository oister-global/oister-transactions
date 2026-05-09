import { baseApi } from "./baseApi";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/manager/transactions",
      providesTags: ["Transactions"],
    }),
    getTransaction: builder.query({
      query: ({ id }) => `/manager/transactions/${id}`,
      providesTags: ["Transactions"],
    }),
    showInterest: builder.mutation({
      query: ({ id }) => ({
        url: `/manager/transactions/i-am-interested/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const { useGetTransactionsQuery, useGetTransactionQuery, useShowInterestMutation } =
  transactionsApi;
