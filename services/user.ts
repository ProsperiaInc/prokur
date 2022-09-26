import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Auth, User } from './types'

export const userApi = createApi({
  reducerPath: 'userApi',
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
    invite: builder.mutation({ 
      query: (data) => ({
        url: '/user-management/invite',
        method: 'POST',
        body: data,
      }),
    })
  }),
})

export { Auth, User }
export const { useInviteMutation } = userApi