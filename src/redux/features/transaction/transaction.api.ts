import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // sendMoney: builder.mutation({
    //   query: (payload) => ({
    //     url: "/wallet/send-money",
    //     method: "POST",
    //     data: payload,
    //   }),
    //   invalidatesTags: ["USER"],
    // }),
    getTransactions: builder.query({
      query: (params) => ({
        url: "/transaction/my-transaction",
        method: "GET",
        params,
      }),
      providesTags: ["USER", "AGENT", "ADMIN"],
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionApi;
