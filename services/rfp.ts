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
    getRfpShareLink: builder.query({ query: (rfpId) => `/${rfpId}/share-links` }),
    saveRfp: builder.mutation({ query: (data) => ({ url: `/`, method: 'POST', body: data }) }),
    editRfp: builder.mutation({ query: (data) => ({ url: `/${data.id}`, method: 'PUT', body: data }) }),
    getRfp: builder.query({ query: (id: string) => `/${id}` }),
    getRfpCategories: builder.query({ query: () => `/categories/` }),
    getRfpAttachment: builder.query({ query: ({ rfpId, sectionIndex }) => `/${rfpId}/attachments/${sectionIndex}` }),
    setRfpShareEmails: builder.mutation({ query: ({ rfpId, emails }) => ({
        url: `/${rfpId}/share-emails/`, 
        headers: { Accept: 'application/json' },
        body: { emails },
        method: 'POST',
      })
    }),
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
    deleteRfpAttachement: builder.mutation({ query: ({ rfpId, sectionIndex, fileId }) => ({
        url: `/${rfpId}/attachments/${sectionIndex}/${fileId}`,
        method: 'DELETE'
      })
    }),
    uploadRfpAttachement: builder.mutation({
      query: ({ rfpId, sectionIndex, file }) => {
        const bodyFormData = new FormData();
        bodyFormData.append('name', file.name);
        bodyFormData.append('file', file);

        return {
          url: `/${rfpId}/attachments/${sectionIndex}`,
          method: 'POST',
          body: bodyFormData,
        }
      },
    })
  }),
})

export { RFP }
export const {
  useLazyGetCompanyRfpsQuery,
  useSaveRfpMutation,
  useEditRfpMutation,
  useLazyGetRfpQuery,
  useLazyGetRfpCategoriesQuery,
  useUploadRfpAttachementMutation,
  useLazyGetRfpAttachmentQuery,
  useLazyGetRfpShareLinkQuery,
  useDeleteRfpAttachementMutation,
  useSetRfpShareEmailsMutation
} = rfpApi
