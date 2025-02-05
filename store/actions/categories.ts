import { ICategory, ISkill } from '@/lib/types/project';
import { baseAPI } from '@/store/api';

const categoryEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ categories: ICategory[] }, void>({
      query: () => ({
        url: `/categories`,
        method: 'GET',
      }),
    }),
    getSkills: builder.query<{ skills: ISkill[] }, void>({
        query: () => ({
          url: `/skills`,
          method: 'GET',
        }),
      }),
  }),
});

export const { useGetCategoriesQuery,useGetSkillsQuery } = categoryEndpoints;
