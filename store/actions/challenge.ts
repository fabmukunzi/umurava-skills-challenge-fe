import { IProject } from '@/lib/types/project';
import { baseAPI } from '@/store/api';

export interface CreateChallengeDto
  extends Omit<IProject, 'id' | 'createdAt'|'category'> {}
interface UpdateChallengeDto extends Partial<CreateChallengeDto> {
  id: string;
}
interface ChallengeQueryParams {
  limit: number;
  page: number;
}

const challengeEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getChallenges: builder.query<
      { challenges: IProject[] },
      ChallengeQueryParams
    >({
      query: ({ limit, page }) => ({
        url: `/challenges`,
        method: 'GET',
        params: { limit, page },
      }),
    }),

    getChallengeById: builder.query<{ challenge: IProject }, string>({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: 'GET',
      }),
    }),

    createChallenge: builder.mutation<IProject, CreateChallengeDto>({
      query: (challengeData) => ({
        url: `/challenges`,
        method: 'POST',
        body: challengeData,
      }),
    }),

    updateChallenge: builder.mutation<IProject, UpdateChallengeDto>({
      query: ({ id, ...challengeData }) => ({
        url: `/challenges/${id}`,
        method: 'PUT',
        body: challengeData,
      }),
    }),

    deleteChallenge: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: 'DELETE',
      }),
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
