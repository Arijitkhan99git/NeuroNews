import { Slot } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useThemeStore } from "@/store/useThemeStore";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import * as Network from "expo-network";

import { SafeAreaProvider } from "react-native-safe-area-context";

onlineManager.setEventListener((setOnline) => {
  let initialised = false;

  // Listen for changes
  const eventSubscription = Network.addNetworkStateListener((state) => {
    initialised = true;
    setOnline(!!state.isConnected);
  });

  // Fetch the initial state immediately on boot
  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialised) {
        setOnline(!!state.isConnected);
      }
    })
    .catch(() => {
      /* Handle optional native error safely */
    });

  // Return unsubscribe cleanup function
  return () => {
    if (eventSubscription && typeof eventSubscription.remove === "function") {
      eventSubscription.remove();
    }
  };
});

export default function RootLayout() {
  const mode = useThemeStore((state) => state.mode);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GluestackUIProvider mode={mode}>
          <Slot />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
