// store/useLanguageStore.ts
import { LanguageCode } from "@/api/model/language-model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LanguageState {
  languageCode: LanguageCode;
  setLanguageCode: (code: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      languageCode: "en",
      setLanguageCode: (code) => set({ languageCode: code }),
    }),
    {
      name: "neuronews-language",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
