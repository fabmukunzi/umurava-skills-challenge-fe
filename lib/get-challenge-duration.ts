import dayjs from 'dayjs';

type ChallengeStatus = 'Open' | 'Ongoing' | 'Completed';

export const getChallengeDuration = (
  startDate: Date,
  deadline: Date
): number => {
  return dayjs(deadline).diff(dayjs(startDate), 'day');
};

export const getChallengeStatus = (
  startDate: Date,
  deadline: Date
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
