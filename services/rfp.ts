import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RFP } from './types'

export const rfpApi = createApi({
  reducerPath: 'rfpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/rfp',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCompanyRfps: builder.query({
      async queryFn(_args, _queryApi, _extraOptions, fetchWithBQ) {
        let { data: companyRfps, error } = await fetchWithBQ('/')
        const rfp: any = {};
        if(error) return { error }
        companyRfps = await Promise.all((companyRfps as any).map(async (rfp: any) => {
          const proposalsRfp = await fetchWithBQ(`/${rfp.id}/submitted-proposals`)
          return proposalsRfp.error 
          ? { error: proposalsRfp.error }
          : { ...rfp, proposalsCount: (proposalsRfp.data as any || []).length }
        }));
        (companyRfps as any).forEach((oneRfp: any) => {
          rfp[oneRfp.id] = oneRfp;
        });
        return { data: rfp }
      },
    }),
    saveRfp: builder.mutation({ query: (data) => ({ url: `/`, method: 'POST', body: data }) }),
    getRfp: builder.query({ query: (id: string) => `/${id}` }),
    getRfpCategories: builder.query({ query: () => `/categories/` }),
    uploadRfpAttachement: builder.mutation({
      query: ({ rfpId, sectionIndex, file }) => {
        const bodyFormData = new FormData();
        bodyFormData.append('name', file.name);
        bodyFormData.append('file', file);

        return {
          url: `rfp/${rfpId}/attachments/${sectionIndex}`,
          method: 'POST',
          body: bodyFormData,
          headers: {
            ['Content-Type']: 'multipart/form-data'
          }
        }
      }
    })
  }),
})

export { RFP }
export const { useLazyGetCompanyRfpsQuery, useSaveRfpMutation, useLazyGetRfpQuery, useLazyGetRfpCategoriesQuery, useUploadRfpAttachementMutation } = rfpApi
