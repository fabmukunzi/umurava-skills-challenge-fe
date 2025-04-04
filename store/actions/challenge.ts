import {
  IGetChallengesResponse,
  IProject,
  ParticipantChallengesResponse,
} from '@/lib/types/project';
import { baseAPI } from '@/store/api';

export type CreateChallengeDto = Omit<
  IProject,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'status'
  | 'duration'
  | 'submissionDate'
  | '__v'
  | 'duration'
  | 'submissionDate'
>;

interface UpdateChallengeDto extends Partial<CreateChallengeDto> {
  id: string;
}

export type SubmitChallengeDto = {
  submissionLink: string;
  description: string;
}
export type ChallengeFeedbackDto = {
  feedback: string;
  submissionId: string;
  challengeId: string;
}
interface ChallengeQueryParams {
  limit: number;
  page: number;
}


const challengeEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getChallenges: builder.query<IGetChallengesResponse, ChallengeQueryParams>({
      query: ({ limit, page }) => ({
        url: `/public/challenges`,
        method: 'GET',
        params: { limit, page },
      }),
      providesTags: ['challenges'],
    }),

    getChallengeById: builder.query<{ data: IProject }, string>({
      query: (id) => ({
        url: `/public/challenges/${id}`,
        method: 'GET',
      }),
      providesTags: ['challenge'],
    }),

    createChallenge: builder.mutation<IProject, CreateChallengeDto>({
      query: (challengeData) => ({
        url: `/admin/challenge`,
        method: 'POST',
        body: challengeData,
      }),
      invalidatesTags: ['challenges'],
    }),

    updateChallenge: builder.mutation<IProject, UpdateChallengeDto>({
      query: ({ id, ...challengeData }) => ({
        url: `/admin/challenge/${id}`,
        method: 'PUT',
        body: challengeData,
      }),
      invalidatesTags: ['challenge', 'challenges'],
    }),

    deleteChallenge: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/challenge/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['challenge', 'challenges'],
    }),
    getParticipantsByChallengeId: builder.query<
      ParticipantChallengesResponse,
      { challengeId: string; page?: number; limit?: number }
    >({
      query: ({ challengeId, ...params }) => ({
        url: `/participant/${challengeId}/all`,
        params,
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
  useGetParticipantsByChallengeIdQuery,
} = challengeEndpoints;
