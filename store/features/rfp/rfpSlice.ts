import { createSlice } from '@reduxjs/toolkit'
import { rfpApi } from 'services/rfp'
import type { RootState } from 'store'

const initialState = () => {
  return { 
    list: {},
    isLoading: true,
    selected: null,
    categories: [{
      id: 0,
      label: 'Loading'
    }]
  }
}

const rfpSlice = createSlice({
  name: 'rfp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      rfpApi.endpoints.getCompanyRfps.matchFulfilled,
      (state, { payload }) => {
        if(payload) state.list = payload
        state.isLoading = false
      }
    ),
    builder.addMatcher(
      rfpApi.endpoints.getRfpCategories.matchFulfilled,
      (state, { payload }) => {
        if(payload) state.categories = payload
        state.isLoading = false
      }
    )
  },
})

export default rfpSlice.reducer

export const selectRFPData = (state: RootState) => {
  return {
    loadingRfps: state.rfp.isLoading,
    rfpNumber: Object.values(state.rfp.list).length,
    myRfps: state.rfp.list,
    order: {
      direction: 'desc',
      orderBy: '2',
    },
  }
}

export const selectRFPCategories = (state: RootState) => state.rfp.categories
