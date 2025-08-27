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
    allUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useAllUsersQuery } = adminApi;
