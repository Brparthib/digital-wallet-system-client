import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // userInfoUpdate: builder.mutation({
    //   query: ({ id, userInfo }) => ({
    //     url: `/user/${id}`,
    //     method: "PATCH",
    //     data: userInfo,
    //   }),
    //   invalidatesTags: ["USER"],
    // }),
    // toggleWalletStatus: builder.mutation({
    //   query: ({ phone }) => ({
    //     url: `/wallet/${phone}`,
    //     method: "PATCH",
    //   }),
    //   //   invalidatesTags: ["USER"],
    // }),
    updateUserWallet: builder.mutation({
      query: ({ phone, walletStatus }) => ({
        url: `/wallet/${phone}`,
        method: "PATCH",
        data: walletStatus,
      }),
      invalidatesTags: ["WALLET"],
    }),
    allUsers: builder.query({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    getAllTransactionStats: builder.query({
      query: () => ({
        url: "/stats/all-transactions",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getUserStats: builder.query({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useUpdateUserWalletMutation,
  useGetAllTransactionStatsQuery,
  useGetUserStatsQuery,
} = adminApi;
