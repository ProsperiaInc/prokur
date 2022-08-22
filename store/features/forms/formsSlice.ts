import { createSlice } from '@reduxjs/toolkit'
import { authApi } from 'services/auth'
import type { RootState } from 'store'

type IError = { data: { error: string } } | null
type IForms = { 
  [x: string]: { formError: IError, data: any, errors: any[] }
}

const formSlice = createSlice({
  name: 'forms',
  initialState: {} as IForms,
  reducers: {
    setForm: (state, action) => {
      const name = Object.keys(action.payload)[0]
      state[name] = action.payload[name]
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        state.login = {
          ...(state.login || {}),
          formError: payload as IError
        }
      }
    )
  },
})

export const { setForm } = formSlice.actions;
export const selectForms = (state: RootState) => state.forms

export default formSlice.reducer
