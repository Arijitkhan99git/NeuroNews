interface Author {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
}

interface Metrics {
  comments: number;
  retweets: number;
  likes: number;
  views: string;
}

type ImpactLevel = "high" | "medium" | "low";

type IconType = "Zap" | "Brain" | "Cpu" | "Server";

export interface NewsItem {
  id: number;
  author: Author;
  content: string;
  tags: string[];
  category: string;
  iconType: IconType;
  impact: ImpactLevel;
  timestamp: string; // ISO date string, e.g. "2026-08-24"
  metrics: Metrics;
  source: string;
  sourceUrl: string;
  isVideo: boolean;
  videoId: string | null;
  videoDuration: string | null;
  videoViewCount: string | null;
  videoThumbnailUrl: string | null;
}

type LanguageCode = "de" | "en" | "zh" | "fr" | "es" | "pt" | "ja" | "ko";

export type NewsFeedResponse = {
  [key in LanguageCode]: NewsItem[];
};
