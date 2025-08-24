import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
    // getTransactions: builder.query({
    //   query: () => ({
    //     url: "/transaction/my-transaction",
    //     method: "GET",
    //   }),
    //   providesTags: ["USER"],
    // }),
  }),
});

export const { 
    useSendMoneyMutation, 
    // useGetTransactionsQuery 
} = userApi;
