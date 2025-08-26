import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //send money to other user
    sendMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
    // withdraw money by agent
    cashOut: builder.mutation({
      query: (payload) => ({
        url: "/wallet/cash-out",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
    getUserTransactionStats: builder.query({
      query: (params) => ({
        url: "/stats/user-transactions",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useCashOutMutation,
  useGetUserTransactionStatsQuery,
} = userApi;
