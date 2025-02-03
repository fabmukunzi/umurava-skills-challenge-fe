import { ICategory } from '@/lib/types/project';
import { baseAPI } from '@/store/api';

const categoryEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ categories: ICategory[] }, void>({
      query: () => ({
        url: `/categories`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryEndpoints;
