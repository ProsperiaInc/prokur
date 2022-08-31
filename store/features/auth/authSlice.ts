import { createSlice } from '@reduxjs/toolkit'
import { authApi, User } from 'services/auth'
import { companyApi } from 'services/company'
import { rfpApi } from 'services/rfp'
import type { RootState } from 'store'

type AuthState = { 
  user: User | null
  token?: string | null,
  isLoading: boolean
}

const initialState = () => {
  const token = typeof localStorage === 'undefined' ? undefined : localStorage.getItem('token')
  return { 
    user: null,
    isLoading: token === null ? false : true,
    token
  } as AuthState
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user
        state.token = payload.access_token
        state.isLoading = false
        localStorage.setItem('token', payload.access_token)
      }
    ),
    builder.addMatcher(
      authApi.endpoints.getUserInfo.matchFulfilled,
      (state, { payload, ...data }) => {
        state.user = payload
        state.isLoading = false
      }
    ),
    builder.addMatcher(
      authApi.endpoints.getUserInfo.matchRejected,
      (state, { payload }) => {
        const { data } = payload as any || {}
        if(data && data.message === 'Unauthenticated.') {
          state.user = null
          state.token = null
          localStorage.removeItem('token')
          state.isLoading = false
        }
      }
    ),
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
        state.token = payload.access_token
        state.isLoading = false
        localStorage.setItem('token', payload.access_token)
      }
    ),
    builder.addMatcher(
      authApi.endpoints.verifyEmail.matchFulfilled,
      (state) => {
        state.user = {
          ...(state.user || {}),
          email_verified_at: (new Date()).toDateString()
        }
      }
    ),
    builder.addMatcher(
      companyApi.endpoints.getCompanyDetails.matchFulfilled,
      (state, { payload }) => {
        state.user = {
          ...(state.user || {}),
          company: {
            ...state.user?.company,
            ...payload,
          },
        }
      }
    ),
    builder.addMatcher(
      rfpApi.endpoints.getRfp.matchFulfilled,
      (state, { payload }) => {
        const rfpDetails: any = {}
        if (typeof payload === 'object') {
          rfpDetails[payload.id] = payload;
        }
        return {
          ...state,
          user: {
            ...state.user,
            rfpDetails: { ...state.user?.rfpDetails, ...rfpDetails },
          }
        }
      }
    )
  }
})

export const selectUser = (state: RootState) => state.auth.user
export const selectAccessToken = (state: RootState) => state.auth.token
export const selectIsAppLoading = (state: RootState) => state.auth.isLoading

export const { userLogout } = authSlice.actions

export default authSlice.reducer