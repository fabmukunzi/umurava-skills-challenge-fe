import { ICategory, ISkill } from '@/lib/types/project';
import { baseAPI } from '@/store/api';

const categoryEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ data: ICategory[] }, void>({
      query: () => ({
        url: `/admin/challenge-category`,
        method: 'GET',
      }),
    }),
    getSkills: builder.query<{ data: ISkill[] }, void>({
      query: () => ({
        url: `/public/skills`,
        method: 'GET',
      }),
    }),
  }),
}),
});

export const { useGetCategoriesQuery, useGetSkillsQuery } = categoryEndpoints;
