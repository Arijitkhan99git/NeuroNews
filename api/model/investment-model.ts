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

type RoundCategory = "Early" | "Unknown"; // widen as more categories show up (e.g. "Growth", "Late")

// --- primaryMarket: funding rounds ---
interface FundingItem {
  id: number;
  author: Author;
  content: string;
  company: string;
  amount: string; // e.g. "$5M", "N/A" — not always numeric, keep as string
  round: string; // e.g. "pre-Series A", "pre-seed", "Unknown"
  roundCategory: RoundCategory;
  investors: string[];
  valuation: string | null; // e.g. "$6B", "$30B+"
  timestamp: string; // ISO date, e.g. "2026-08-24"
  metrics: Metrics;
  sourceUrl: string;
}

// --- secondaryMarket: public market moves (IPOs, share placements, earnings) ---
type PriceDirection = "up" | "down";

interface SecondaryMarketItem {
  id: number;
  author: Author;
  content: string;
  ticker: string;
  price: string; // currently always "" in sample data — kept as string
  change: string; // currently always "" in sample data — kept as string
  direction: PriceDirection;
  marketCap: string | null;
  timestamp: string;
  metrics: Metrics;
  sourceUrl: string;
}

// --- ma: mergers & acquisitions ---
type DealType = "Acquisition" | "Merger" | string; // localized values appear too (e.g. "Übernahme", "收购") — widen to string if you don't translate dealType client-side

interface MergerAcquisitionItem {
  id: number;
  author: Author;
  content: string;
  acquirer: string; // can be "Unknown"
  target: string;
  dealValue: string | null; // e.g. "$13B", "$100M"
  dealType: DealType;
  industry: string | null;
  timestamp: string;
  metrics: Metrics;
  sourceUrl: string;
}

// --- top-level response ---
type LanguageCode = "en" | "de" | "zh" | "fr" | "es" | "pt" | "ja" | "ko";

type LocalizedFeed<T> = {
  [key in LanguageCode]: T[];
};

export interface MarketNewsResponse {
  primaryMarket: LocalizedFeed<FundingItem>;
  secondaryMarket: LocalizedFeed<SecondaryMarketItem>;
  ma: LocalizedFeed<MergerAcquisitionItem>;
}
