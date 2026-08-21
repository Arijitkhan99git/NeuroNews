import { Slot } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <Slot />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
