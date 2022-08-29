import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Auth, User } from './types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      headers.set('Accept', 'application/json')
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
        method: 'GET'
      })
    }),
    signup: builder.mutation({ 
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body
      })
    }),
    resendEmail: builder.query({ 
      query: () => ({
        url: '/email/resend/',
        method: 'GET'
      })
    }),
    verifyEmail: builder.mutation({ 
      query: (code) => ({
        url: '/email/verify/',
        method: 'POST',
        body: { code }
      })
    }),
  }),
})

export { Auth, User }
export const { useLoginMutation, useLazyGetUserInfoQuery, useSignupMutation, useLazyResendEmailQuery, useVerifyEmailMutation } = authApi