import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCompanyDetails: builder.query({ query: () => `/` }),
    uploadCompanyImage: builder.mutation({ query: (data) => {
        const bodyFormData = new FormData();
        bodyFormData.append('logo', data.fileMediaUpload[0]);

        return {
          url: '/company/logo',
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: 'application/json'
          },
          body: bodyFormData,
        }
      } 
    }),
    createCompany: builder.mutation({ query: (data) => ({
        url: '/company',
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: data
      }) 
    }),
    companySearch: builder.query({ query: (data) => ({
        url: '/company-search',
        method: 'GET',
        params: data
      })
    })
  })
})

export const { useLazyGetCompanyDetailsQuery, useCreateCompanyMutation, useUploadCompanyImageMutation, useLazyCompanySearchQuery } = companyApi
