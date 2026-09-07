import { AiTipItem } from "@/api/model/tip-model";
import { create } from "zustand";

interface AiTipsFilterStoreProps {
  tips: AiTipItem[] | null;
  setTips: (tips: AiTipItem[]) => void;

  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  clearCategories: () => void;

  selectedDifficulties: string[];
  setSelectedDifficulties: (difficulties: string[]) => void;
  clearDifficulties: () => void;
}

export const useAiTipsFilterStore = create<AiTipsFilterStoreProps>((set) => ({
  tips: null,
  setTips: (tips) => set({ tips }),

  selectedCategories: [],
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  clearCategories: () => set({ selectedCategories: [] }),

  selectedDifficulties: [],
  setSelectedDifficulties: (difficulties) => set({ selectedDifficulties: difficulties }),
  clearDifficulties: () => set({ selectedDifficulties: [] }),
}));
