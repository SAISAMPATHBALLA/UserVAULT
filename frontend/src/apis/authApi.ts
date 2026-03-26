import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RegisterPayload, LoginPayload, AuthResponse } from '../types/AuthService'
import { API_BACKEND_URL } from '../constants/authConstants'

export const registerUserApi = createApi({
  reducerPath: 'registerUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BACKEND_URL }),
  endpoints: (build) => ({
    registerUser: build.mutation<AuthResponse, RegisterPayload>({
      query: (payload) => ({ url: `/auth/register`, method: 'POST', body: payload }),
    }),
    loginUser: build.mutation<AuthResponse, LoginPayload>({
      query: (payload) => ({ url: `/auth/login`, method: 'POST', body: payload }),
    }),
  }),
})

export const { useRegisterUserMutation, useLoginUserMutation } = registerUserApi
