import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import AiDaily from "@/features/homepage/aiDaily";
import DashboardHeader from "@/features/homepage/header";
import TopStories from "@/features/homepage/topStories/TopStories";
import { useSyncLatestPeriod } from "@/hooks/useSyncLatestPeriod";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  useSyncLatestPeriod();

  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <VStack className="gap-10">
          <DashboardHeader />
          <AiDaily />
          <TopStories />
        </VStack>
      </SafeAreaView>
    </Box>
  );
}
