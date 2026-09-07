import { FundingItem, SecondaryMarketItem } from "@/api/model/investment-model";
import { create } from "zustand";

export type MarketTab = "primary" | "secondary";

interface InvestmentStoreProps {
  activeTab: MarketTab;
  setActiveTab: (tab: MarketTab) => void;

  primaryItems: FundingItem[];
  setPrimaryItems: (items: FundingItem[]) => void;

  secondaryItems: SecondaryMarketItem[];
  setSecondaryItems: (items: SecondaryMarketItem[]) => void;
}

export const useInvestmentStore = create<InvestmentStoreProps>((set) => ({
  activeTab: "primary",
  setActiveTab: (tab) => set({ activeTab: tab }),

  primaryItems: [],
  setPrimaryItems: (items) => set({ primaryItems: items }),

  secondaryItems: [],
  setSecondaryItems: (items) => set({ secondaryItems: items }),
}));
