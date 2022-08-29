import { configureStore } from '@reduxjs/toolkit'
import { authApi } from 'services/auth'
import { setupListeners } from '@reduxjs/toolkit/query'
import logger from 'redux-logger'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { debounce } from 'lodash'
import formsReducer from './features/forms/formsSlice'
import authReducer from './features/auth/authSlice'
import rfpReducer from './features/rfp/rfpSlice'
import { rfpApi } from 'services/rfp'

const debounceNotify = debounce(notify => notify());

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    auth: authReducer,
    rfp: rfpReducer,
    [authApi.reducerPath]: authApi.reducer,
    [rfpApi.reducerPath]: rfpApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authApi.middleware,
    rfpApi.middleware,
    logger,
  ),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {},
  enhancers: [batchedSubscribe(debounceNotify)],
})

setupListeners(store.dispatch)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch