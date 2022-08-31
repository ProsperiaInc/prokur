import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/company',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCompanyDetails: builder.query({ query: () => `/` })
  })
})

export const { useLazyGetCompanyDetailsQuery } = companyApi
