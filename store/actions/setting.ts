/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChallengePagination } from '@/lib/types/project';
import {
  IChallengeCategory,
  IPrizeCategory,
  ISkill,
} from '@/lib/types/setting';
import { UserSchema } from '@/lib/types/user';
import { baseAPI } from '@/store/api';

export interface SystemLog {
  _id: string;
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  duration: string;
  userAgent: string;
  ipAddress: string;
  activity: string;
  details: string;
  status: string;
  doneBy: string;
}

export const settingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<
      { data: { skills: ISkill[]; pagination: ChallengePagination } },
      { params: any }
    >({
      query: ({ params }) => ({
        url: '/admin/skills',
        method: 'GET',
        params,
      }),
      providesTags: ['skills'],
    }),
    addSkill: builder.mutation<void, { skillName: string }>({
      query: (body) => ({
        url: '/admin/skills',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['skills'],
    }),
    deleteSkill: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['skills'],
    }),

    getCategories: builder.query<
      {
        data: {
          categories: IChallengeCategory[];
          pagination: ChallengePagination;
        };
      },
      { params: any }
    >({
      query: ({ params }) => ({
        url: '/admin/challenge-category',
        method: 'GET',
        params,
      }),
      providesTags: ['categories'],
    }),
    addCategory: builder.mutation<void, { challengeCategoryName: string }>({
      query: (body) => ({
        url: '/admin/challenge-category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['categories'],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/challenge-category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),

    getPrizes: builder.query<
      {
        data: { categories: IPrizeCategory[]; pagination: ChallengePagination };
      },
      { params?: any }
    >({
      query: ({ params }) => ({
        url: '/admin/prize-category',
        method: 'GET',
        params,
      }),
      providesTags: ['prizes'],
    }),
    addPrize: builder.mutation<
      void,
      { prizeName: string; currency: string; description: string }
    >({
      query: (body) => ({
        url: '/admin/prize-category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['prizes'],
    }),
    deletePrize: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/prize-category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['prizes'],
    }),

    updateSkill: builder.mutation<void, { id: string; skillName: string }>({
      query: ({ id, skillName }) => ({
        url: `/admin/skills/${id}`,
        method: 'PUT',
        body: { skillName },
      }),
      invalidatesTags: ['skills'],
    }),

    updateCategory: builder.mutation<
      void,
      { id: string; challengeCategoryName: string }
    >({
      query: ({ id, challengeCategoryName }) => ({
        url: `/admin/challenge-category/${id}`,
        method: 'PUT',
        body: { challengeCategoryName },
      }),
      invalidatesTags: ['categories'],
    }),

    updatePrize: builder.mutation<
      void,
      { id: string; prizeName: string; currency: string; description: string }
    >({
      query: ({ id, prizeName, currency, description }) => ({
        url: `/admin/prize-category/${id}`,
        method: 'PUT',
        body: { prizeName, currency, description },
      }),
      invalidatesTags: ['prizes'],
    }),

    getSystemLogs: builder.query<
      { data: { audits: SystemLog[]; pagination: ChallengePagination } },
      { params: any }
    >({
      query: ({ params }) => ({
        url: '/admin/audits/all',
        method: 'GET',
        params,
      }),
      providesTags: ['systemLogs'],
    }),

    getUsers: builder.query<
      { data: { users:UserSchema[]; pagination: ChallengePagination } },
      { params: any }
    >({
      query: ({ params }) => ({
        url: '/auth/users',
        method: 'GET',
        params,
      }),
      providesTags: ['users'],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,

  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,

  useGetPrizesQuery,
  useAddPrizeMutation,
  useDeletePrizeMutation,
  useUpdatePrizeMutation,

  useGetSystemLogsQuery,

  useGetUsersQuery
} = settingsApi;
