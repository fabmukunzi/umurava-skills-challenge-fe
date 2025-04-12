import { SignupRequest, UserSchema } from '@/lib/types/user';
import { baseAPI } from '@/store/api';

export interface SignupResponse {
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
    resetPassword: builder.mutation<
      void,
      { newPassword: string; token: string }
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query<{ data: UserSchema }, void>({
      query: () => '/auth/profile',
    }),
    updateProfile: builder.mutation<
      void,
      { names?: string; profile_url?: string; email?: string }
    >({
      query: (body) => ({
        url: '/auth/profile',
        method: 'PUT',
        body,
      }),
    }),
    updateProfilePicture: builder.mutation<
      void,
      FormData
    >({
      query: (body) => ({
        url: '/auth/profile/upload-picture',
        method: 'POST',
        body,
      }),
    }),
    deactivateAccount: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'DELETE',
      }),
    }),
    changePassword: builder.mutation<
      void,
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: '/auth/profile/change-password',
        method: 'PUT',
        body,
      }),
    }),
    subscribeToNewsletter: builder.mutation<
      void,
      { email: string; }
    >({
      query: (body) => ({
        url: '/public/subscribe-newsletter',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyEmailQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useDeactivateAccountMutation,
  useChangePasswordMutation,
  useSubscribeToNewsletterMutation
} = usersEndpoints;
