// slice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  // other state properties...
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    // other reducers...
  },
});

export const { setEmail } = authSlice.actions;
export default authSlice.reducer;
