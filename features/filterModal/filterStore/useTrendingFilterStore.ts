import { TrendItem } from "@/api/model/trending-model";
import { create } from "zustand";

interface TrendingFilterStoreProps {
  trendingNews: TrendItem[] | null;
  setTrendingNews: (trendingNews: TrendItem[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  clearCategories: () => void;
}

export const useTrendingFilterStore = create<TrendingFilterStoreProps>(
  (set) => ({
    trendingNews: null,
    setTrendingNews: (trendingNews) => set({ trendingNews }),

    selectedCategories: [],
    setSelectedCategories: (categories) =>
      set({ selectedCategories: categories }),
    clearCategories: () => set({ selectedCategories: [] }),
  }),
);
