import { ICareerStats } from '@/components/homepage/stastics';
import { ICategory } from '@/lib/types/project';
import { baseAPI } from '@/store/api';

const categoryEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ data: { categories: ICategory[] } }, void>({
      query: () => ({
        url: `/admin/challenge-category`,
        method: 'GET',
      }),
    }),
    getCareerStats: builder.query<{ data: ICareerStats[] }, void>({
      query: () => ({
        url: `/public/website/data`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCareerStatsQuery } = categoryEndpoints;
