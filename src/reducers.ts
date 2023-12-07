// reducers.ts

import { createReducer } from '@reduxjs/toolkit';
import { setEmail } from './actions';

interface AuthState {
  email: string | null;
}

const initialState: AuthState = {
  email: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setEmail, (state, action) => {
    state.email = action.payload;
  });
  // You can handle other actions here
});

export default authReducer;
