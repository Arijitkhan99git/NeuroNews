// aiTips-model.ts

export type LanguageCode =
  | "de"
  | "en"
  | "zh"
  | "fr"
  | "es"
  | "pt"
  | "ja"
  | "ko";

export type TipDifficulty =
  | "Intermediate"
  | "Mittelstufe"
  | "中级"
  | "Intermédiaire"
  | "Intermedio"
  | "Intermediário"
  | "中級"
  | "중급"
  | (string & {});

export interface TipAuthor {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
}

export interface TipMetrics {
  comments: number;
  retweets: number;
  likes: number;
  views: string;
}

export interface AiTipItem {
  id: number;
  author: TipAuthor;
  platform: string;
  content: string;
  tip: string;
  category: string;
  difficulty: TipDifficulty;
  timestamp: string;
  metrics: TipMetrics;
  sourceUrl: string;
}

export type AiTipsResponse = Partial<Record<LanguageCode, AiTipItem[]>>;
