import { NewsItem } from "@/api/model/techNews-model";

import { create } from "zustand";

interface TechNewsStoreProps {
  allTechNews: NewsItem[] | null;
  setAllTechNews: (allTechNews: NewsItem[]) => void;
}

export const useTechNewsStore = create<TechNewsStoreProps>((set) => ({
  allTechNews: null,
  setAllTechNews: (allTechNews) => set({ allTechNews }),
}));
