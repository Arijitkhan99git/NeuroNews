// stores/useThemeStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "system",
      setMode: (mode) => {
        // "system" maps to null in RN's Appearance API, meaning "follow OS"
        Appearance.setColorScheme(mode === "system" ? null : mode);
        set({ mode });
      },
    }),
    {
      name: "neuronews-theme",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
