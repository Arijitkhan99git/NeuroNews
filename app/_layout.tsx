import { Slot } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

import { useThemeStore } from "@/store/useThemeStore";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const mode = useThemeStore((state) => state.mode);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode={mode}>
        <Slot />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
