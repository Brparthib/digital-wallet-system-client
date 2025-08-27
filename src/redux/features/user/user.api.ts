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
      query: () => ({
        url: "/stats/user-transactions",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    userInfoUpdate: builder.mutation({
      query: ({ id, userInfo }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    userWallet: builder.query({
      query: (params) => ({
        url: "/wallet",
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
  useUserInfoUpdateMutation,
  useUserInfoQuery,
  useUserWalletQuery
} = userApi;
