const BASE_URL =
  process.env.EXPO_PUBLIC_NEWS_API_URL ??
  "https://api-production-3ee5.up.railway.app/api";

export const API_ENDPOINTS = {
  weeks: `${BASE_URL}/weeks`,

  tech: (periodId: string) => `${BASE_URL}/tech/${periodId}`,

  investment: (periodId: string) => `${BASE_URL}/investment/${periodId}`,

  tips: (periodId: string) => `${BASE_URL}/tips/${periodId}`,

  videos: (periodId: string) => `${BASE_URL}/videos/${periodId}`,

  trends: (periodId: string) => `${BASE_URL}/trends/${periodId}`,
};
