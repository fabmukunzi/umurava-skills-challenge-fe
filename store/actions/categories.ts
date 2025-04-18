import { ICareerStats } from '@/components/homepage/stastics';
import { baseAPI } from '@/store/api';

const categoryEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCareerStats: builder.query<{ data: ICareerStats[] }, void>({
      query: () => ({
        url: `/public/website/data`,
        method: 'GET',
      }),
      providesTags: ['stats'],
    }),
  }),
});

export const { useGetCareerStatsQuery } = categoryEndpoints;
