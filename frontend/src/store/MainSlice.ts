import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    user : null,
  },
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    },
    setUserDetails: (state, action) => {
      
      state.user = action.payload;
      console.log(state.user);
    }
   
  },
})

export const { increment, setUserDetails} = counterSlice.actions;

export default counterSlice.reducer;