import { IProject } from '@/lib/types/project';
import { baseAPI } from '@/store/api';

export type CreateChallengeDto = Omit<IProject, 'id' | 'createdAt' | 'category'>;

interface UpdateChallengeDto extends Partial<CreateChallengeDto> {
  id: string;
}
interface ChallengeQueryParams {
  limit: number;
  page: number;
}
interface IStatusCount {
  Open: number;
  Ongoing: number;
  Completed: number;
}

const challengeEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getChallenges: builder.query<
      { challenges: IProject[]; statusCounts: IStatusCount; total: number,totalPages: number},
      ChallengeQueryParams
    >({
      query: ({ limit, page }) => ({
        url: `/challenges`,
        method: 'GET',
        params: { limit, page },
      }),
      providesTags:['challenges'],
    }),

    getChallengeById: builder.query<{ challenge: IProject }, string>({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: 'GET',
      }),
      providesTags:['challenge'],
    }),

    createChallenge: builder.mutation<IProject, CreateChallengeDto>({
      query: (challengeData) => ({
        url: `/challenges`,
        method: 'POST',
        body: challengeData,
      }),
      invalidatesTags:['challenges'],
    }),

    updateChallenge: builder.mutation<IProject, UpdateChallengeDto>({
      query: ({ id, ...challengeData }) => ({
        url: `/challenges/${id}`,
        method: 'PATCH',
        body: challengeData,
      }),
      invalidatesTags:['challenge','challenges'],
    }),

    deleteChallenge: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:['challenge','challenges'],
    }),
  }),
});

export const {
  useGetChallengesQuery,
  useGetChallengeByIdQuery,
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
} = challengeEndpoints;
