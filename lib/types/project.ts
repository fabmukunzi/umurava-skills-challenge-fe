import { StaticImageData } from 'next/image';
import { UserSchema } from './user';
import { SubmitChallengeDto } from '@/store/actions/challenge';

export interface ICategory {
  _id: string;
  challengeCategoryName: string;
  description: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISkill {
  _id: string;
  skillName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAdvert {
  logo: StaticImageData;
  content: string;
  link: string;
  otherImage: StaticImageData;
}

export interface IProject {
  _id: string;
  challengeName: string;
  challengeCategory: string;
  startDate: string;
  endDate: string;
  submissionDate: string;
  duration: number;
  joined_status?: boolean
  submissionStatus: string;
  moneyPrize: {
    categoryPrize: string;
    prize: string;
    currency: string;
    _id?: string;
  }[];
  contactEmail: string;
  projectDescription: string;
  teamSize: string;
  skills: string[];
  levels: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IParticipantsSubmissions extends SubmitChallengeDto {
  _id: string;
  challengeId: string;
  teamLead: UserSchema;
  members: UserSchema[];
  submissionStatus: string;
  submissionDate: string | null;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
export interface ChallengeAggregates {
  totalChallenges: number;
  totalCompletedChallenges: number;
  totalOpenChallenges: number;
  totalOngoingChallenges: number;
}

export interface IStatistics extends Partial<ChallengeAggregates> {
  totalChallengesThisWeek: number,
  totalChallengesThisWeekChange: number,
  totalChallengesThisWeekChangeDirection: string,
  totalParticipantsThisWeek: number,
  totalParticipantsThisWeekChange: number,
  totalParticipantsThisWeekChangeDirection: string,
  totalCompletedChallengesChange: number,
  totalCompletedChallengesChangeDirection: string,
  totalOngoingChallengesChange: number,
  totalOngoingChallengesChangeDirection: string,
  totalOpenChallengesChange: number,
  totalOpenChallengesChangeDirection: number,
}

export interface ChallengePagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface IGetChallengesResponse {
  status: string;
  message: string;
  data: {
    aggregates: ChallengeAggregates;
    challenges: IProject[];
    pagination: ChallengePagination;
  };
}

export interface ParticipantChallenge {
  rejectionReason: string | null;
  _id: string;
  challengeId: string;
  teamLead: UserSchema;
  members: UserSchema[];
  submissionStatus: string;
  submissionDate: string | null;
  submissionData?: {
    link: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ParticipantChallengesResponse {
  status: string;
  message: string;
  data: {
    participantChallenges: ParticipantChallenge[];
  };
}
