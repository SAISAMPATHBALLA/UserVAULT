import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RegisterPayload, LoginPayload, AuthResponse } from '../types/AuthService'
import { API_BACKEND_URL } from '../constants/authConstants'

export const registerUserApi = createApi({
  reducerPath: 'registerUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BACKEND_URL }),
  endpoints: (build) => ({
    getRegisterUserApi: build.query<AuthResponse, RegisterPayload>({
      query: () => ({ url: `/auth/register`, method: 'POST' }),
    }),
    loginUser: build.mutation<AuthResponse, LoginPayload>({
      query: (payload) => ({ url: `/auth/login`, method: 'POST', body: payload }),
    }),
  }),
})

export const { useGetRegisterUserApiQuery, useLoginUserMutation } = registerUserApi
