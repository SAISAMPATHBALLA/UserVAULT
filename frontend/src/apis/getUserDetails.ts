import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Users, UsersResponse, User } from '../types/Users'
import { API_BASE_URL } from '../constants/authConstants'

export const usersDetailsApi = createApi({
  reducerPath: 'userFetchApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (build) => ({
    getUserDetails: build.query<Users, void>({
      query: () => ({
        url: `users`,
        method: 'GET',
      }),
    }),
    getUsers: build.query<UsersResponse, { limit: number; skip: number; sortBy?: string; order?: 'asc' | 'desc' }>({
      query: ({ limit, skip, sortBy, order }) => ({
        url: 'users',
        method: 'GET',
        params: {
          limit,
          skip,
          ...(sortBy ? { sortBy, order: order ?? 'asc' } : {}),
        },
      }),
    }),
    searchUsers: build.query<UsersResponse, string>({
      query: (q) => ({
        url: 'users/search',
        method: 'GET',
        params: { q },
      }),
    }),
    getUserById: build.query<User, number>({
      query: (id) => ({ url: `users/${id}` }),
    }),
  }),
})

export const {
  useGetUserDetailsQuery,
  useGetUsersQuery,
  useSearchUsersQuery,
  useGetUserByIdQuery,
} = usersDetailsApi
