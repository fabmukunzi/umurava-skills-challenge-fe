import dayjs from 'dayjs';

type ChallengeStatus = 'Open' | 'Ongoing' | 'Completed';

export const getChallengeDuration = (
  startDate: string,
  deadline: string
): number => {
  return dayjs(deadline).diff(dayjs(startDate), 'day');
};

export const getChallengeStatus = (
  startDate: string,
  deadline: string
): ChallengeStatus => {
  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(deadline);

  if (now.isBefore(start)) {
    return 'Open';
  } else if (now.isAfter(end)) {
    return 'Completed';
  } else {
    return 'Ongoing';
  }
};
