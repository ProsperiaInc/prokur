import { createSlice } from '@reduxjs/toolkit'
import { authApi, Auth, User } from 'services/auth'
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
    isLoading: token === undefined,
    token
  } as AuthState
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user
        state.token = payload.access_token
        localStorage.setItem('token', payload.access_token)
      }
    )
  },
})

export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user
export const selectAccessToken = (state: RootState) => state.auth.token
export const selectIsAppLoading = (state: RootState) => state.auth.isLoading
