import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './MainSlice.ts'
export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})