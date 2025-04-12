import { baseAPI } from '@/store/api';

export interface Skill {
  _id: string;
  skillName: string;
}

export interface ChallengeCategory {
  _id: string;
  challengeCategoryName: string;
}

export interface PrizeCategory {
  _id: string;
  prizeName: string;
  currency: string;
  description: string;
}

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
    getSkills: builder.query<{ data: Skill[] }, void>({
      query: () => '/admin/skills',
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

    getCategories: builder.query<{ data: ChallengeCategory[] }, void>({
      query: () => '/admin/challenge-category',
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

    getPrizes: builder.query<{ data: PrizeCategory[] }, void>({
      query: () => '/admin/prize-category',
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

    getSystemLogs: builder.query<{ data: SystemLog[] }, void>({
      query: () => '/admin/audits/all',
      providesTags: ['systemLogs'],
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
} = settingsApi;
