export const formatToK = (num: number): string => {
    return num >= 1000 ? `${(num / 1000).toFixed(0)}K` : num.toString();
};