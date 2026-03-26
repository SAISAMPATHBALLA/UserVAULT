import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Users } from '../types/Users'
import { API_BASE_URL } from '../constants/authConstants'

export const usersDetailsApi = createApi({
  reducerPath: 'userFetchApi',
  baseQuery: fetchBaseQuery({ baseUrl:API_BASE_URL }),
  endpoints: (build) => ({
    getUserDetails: build.query<Users, void>({
      query: () =>({
            url:`users`,
            method:"GET"
      })
    }),
  }),
})

export const { useGetUserDetailsQuery } = usersDetailsApi
