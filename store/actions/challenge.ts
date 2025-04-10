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

interface UpdateChallengeStatusDto {
  id: string;
  status: string;
}

export type SubmitChallengeDto = {
  links: {
    link: string;
    description: string;
  }[];
  details_message: string;
}
export type ChallengeFeedbackDto = {
  feedback: string;
  submissionId: string;
  challengeId: string;
}
interface ChallengeQueryParams {
  limit: number;
  page: number;
  status?: string;
  search?: string;
}


const challengeEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getChallenges: builder.query<IGetChallengesResponse, ChallengeQueryParams>({
      query: ({ limit, page, status, search }) => ({
        url: `/public/challenges`,
        method: 'GET',
        params: { limit, page, status, search },
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

    updateChallengeStatus: builder.mutation<IProject, UpdateChallengeStatusDto>({
      query: ({ id, ...challengeData }) => ({
        url: `/admin/challenge/update/status/${id}`,
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
    submitChallenge: builder.mutation<{ message: string }, { id: string; data: SubmitChallengeDto }>({
      query: ({ id, data }) => ({
        url: `/participant/${id}/submit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['challenge'],
    }),
    joinChallenge: builder.mutation({
      query: ({ challengeId, payload }) => ({
        url: `participant/join/challenge/${challengeId}`,
        method: 'POST',
        body: payload,
      }),
    }),
    giveChallengeFeedback: builder.mutation<{ message: string }, ChallengeFeedbackDto>({
      query: (data) => ({
        url: `/challenges/${data.challengeId}/submissions/${data.submissionId}/feedback`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['challenge'],
    }),
  }),
});

export const {
  useGetChallengesQuery,
  useGetChallengeByIdQuery,
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
  useUpdateChallengeStatusMutation,
  useDeleteChallengeMutation,
  useGetParticipantsByChallengeIdQuery,
  useSubmitChallengeMutation,
  useGiveChallengeFeedbackMutation,
  useJoinChallengeMutation
} = challengeEndpoints;
