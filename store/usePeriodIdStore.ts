// stores/useLatestPeriodStore.ts
import { create } from "zustand";

interface LatestPeriodState {
  latestPeriodId: string | null;
  setLatestPeriodId: (id: string | null) => void;
}

export const useLatestPeriodStore = create<LatestPeriodState>((set) => ({
  latestPeriodId: null,
  setLatestPeriodId: (id) => set({ latestPeriodId: id }),
}));
