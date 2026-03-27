import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Users, UsersResponse, User } from '../types/Users'
import { API_BASE_URL } from '../constants/authConstants'
import type { CartsResponse } from '../types/UserCart'
import type { PostsResponse } from '../types/UserPosts'
import type { TodosResponse } from '../types/UserTodos'
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
    UsersByHairColor: build.query<UsersResponse, string>({
      query: (hairColor) => ({
        url: `users/filter?key=hair.color&value=${hairColor}`,
        method: 'GET',
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
    getUserCartsById: build.query<CartsResponse, number>({
      query: (id) => ({ url: `users/${id}/carts` }),
    }),
    getUserPostsById: build.query<PostsResponse, number>({
      query: (id) => ({ url: `users/${id}/posts` }),
    }),
    getUserTodosById: build.query<TodosResponse, number>({
      query: (id) => ({ url: `users/${id}/todos` }),
    }),
    getAllUsers: build.query<UsersResponse, void>({
      query: () => ({ url: 'users', params: { limit: 0 } }),
    }),
  }),
})

export const {
  useGetUserDetailsQuery,
  useGetUsersQuery,
  useSearchUsersQuery,
  useGetUserByIdQuery,
  useUsersByHairColorQuery,
  useGetUserCartsByIdQuery,
  useGetUserPostsByIdQuery,
  useGetUserTodosByIdQuery,
  useGetAllUsersQuery,
} = usersDetailsApi
