import { api } from "./api";
import { UserType, UserWithTokenType } from "../../types/user.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserWithTokenType, UserType>({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData
      })
    }),
    register: builder.mutation<UserWithTokenType, UserType>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData
      })
    }),
    current: builder.query<UserWithTokenType, void>({
      query: () => ({
        url: "/user/current",
        method: "GET"
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery
} = authApi;

export const { endpoints: { login, register, current } } = authApi;