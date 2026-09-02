import { NewsItem } from "@/api/model/techNews-model";

import { create } from "zustand";

interface TechNewsFilterStoreProps {
  techNews: NewsItem[] | null;
  setTechNews: (techNews: NewsItem[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  clearCategories: () => void;
  selectedDifficulties: string[];
  setSelectedDifficulties: (selectedDifficulties: string[]) => void;
  clearDifficulties: () => void;
}

export const useTechNewsFilterStore = create<TechNewsFilterStoreProps>(
  (set) => ({
    techNews: null,
    setTechNews: (techNews) => set({ techNews }),

    selectedCategories: [],
    setSelectedCategories: (categories) =>
      set({ selectedCategories: categories }),
    clearCategories: () => set({ selectedCategories: [] }),

    selectedDifficulties: [],
    setSelectedDifficulties: (difficulties) =>
      set({ selectedDifficulties: difficulties }),
    clearDifficulties: () => set({ selectedDifficulties: [] }),
  }),
);
