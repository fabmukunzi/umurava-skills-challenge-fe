import {
  configureStore,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { baseAPI } from '@/store/api';
import userReducer from '@/store/reducers/user';
import { signOut } from 'next-auth/react';

interface ErrorPayload {
  data?: {
    message: string;
    [key: string]: string;
  };
}

export const rtkQueryErrorLogger: Middleware = () => (next) => async (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as ErrorPayload;

    if (payload?.data?.message === 'Invalid token') {
      console.warn('Token expired, logging out...');
      await signOut({ redirect: false });
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
