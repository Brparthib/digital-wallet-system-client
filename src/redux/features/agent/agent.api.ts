import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cashIn: builder.mutation({
      query: (payload) => ({
        url: "/wallet/cash-in",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["AGENT"],
    }),
  }),
});

export const { useCashInMutation } = agentApi;
