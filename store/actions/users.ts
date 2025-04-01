import { SignupRequest } from '@/lib/types/user';
import { baseAPI } from '@/store/api';

interface SignupResponse {
  id: string;
  email: string;
  role: string;
  token: string;
  profileUrl?: string;
}
const usersEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    verifyEmail: builder.query<void, string>({
      query: (token) => ({
        url: `/auth/verify-email/${token}`,
        method: 'GET',
      }),
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<void, { newPassword: string; token: string }>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyEmailQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = usersEndpoints;
