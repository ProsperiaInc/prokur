import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Auth, User } from './types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Auth, string>({ 
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    getUserInfo: builder.query({ 
      query: () => ({
        url: '/user',
        method: 'GET',
        headers: { Accept: 'application/json' }
      })
    })
  }),
})

export { Auth, User }
export const { useLoginMutation, useGetUserInfoQuery } = authApi