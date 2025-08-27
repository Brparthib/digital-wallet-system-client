import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cashIn: builder.mutation({
      query: (payload) => ({
        url: "/wallet/cash-in",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["AGENT", "WALLET"],
    }),
    getAgentStats: builder.query({
      query: () => ({
        url: "/stats/agent-transactions",
        method: "GET",
      }),
      providesTags: ["AGENT"],
    }),
  }),
});

export const { useCashInMutation, useGetAgentStatsQuery } = agentApi;
