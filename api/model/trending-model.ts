/** Momentum indicator for a trending topic */
type TrendMomentum = "new" | "rising" | "falling" | "steady";

/** Supported locale keys used across the trends/teamMembers maps */
type LocaleCode = "de" | "en" | "zh" | "fr" | "es" | "pt" | "ja" | "ko";

/** A single trending topic entry */
interface TrendItem {
  category: string;
  title: string;
  posts: number | null;
  momentum: TrendMomentum;
  streak: number;
}

/** A team member entry (shape inferred — currently only seen as empty arrays) */
interface TeamMember {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
}

/** Editorial content block (shape inferred — currently only seen as null) */
interface EditorialContent {
  title: string;
  body: string;
  author?: string;
  publishedAt?: string;
}

/** Root response shape */
export interface TrendsResponse {
  trends: Record<LocaleCode, TrendItem[]>;
  teamMembers: Partial<Record<LocaleCode, TeamMember[]>>;
  editorial: EditorialContent | null;
}
