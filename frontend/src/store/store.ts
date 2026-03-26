import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './MainSlice.ts'
import { setupListeners } from '@reduxjs/toolkit/query'
import { registerUserApi } from '../apis/authApi.ts'
import { usersDetailsApi } from '../apis/getUserDetails.ts'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [registerUserApi.reducerPath]: registerUserApi.reducer,
    [usersDetailsApi.reducerPath]: usersDetailsApi.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(registerUserApi.middleware)
  .concat(usersDetailsApi.middleware),
})
setupListeners(store.dispatch)