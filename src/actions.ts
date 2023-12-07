import { createAction } from '@reduxjs/toolkit';

export const setEmail = createAction<string>('auth/setEmail');