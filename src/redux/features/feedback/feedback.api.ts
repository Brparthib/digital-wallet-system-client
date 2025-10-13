import { baseApi } from "@/redux/baseApi";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    giveFeedback: builder.mutation({
      query: (payload) => ({
        url: "/feedback",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const { useGiveFeedbackMutation } = feedbackApi;
