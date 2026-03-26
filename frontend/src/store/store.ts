import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './MainSlice.ts'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersDetailsApi } from '../apis/authApi.ts'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [usersDetailsApi.reducerPath]: usersDetailsApi.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(usersDetailsApi.middleware),
})
setupListeners(store.dispatch)