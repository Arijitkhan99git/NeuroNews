import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import AiDaily from "@/features/homepage/aiDaily";
import DashboardHeader from "@/features/homepage/header";
import InvestmentHomePage from "@/features/homepage/investment";
import AiTipsHomePage from "@/features/homepage/tips";
import TopStories from "@/features/homepage/topStories/TopStories";
import TrendingHomePage from "@/features/homepage/trending";
import { useSyncLatestPeriod } from "@/hooks/useSyncLatestPeriod";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  useSyncLatestPeriod();

  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <VStack className="gap-10 pb-30">
            <DashboardHeader />
            <AiDaily />
            <VStack className="gap-14">
              <TopStories />
              <TrendingHomePage />
              <InvestmentHomePage />
              <AiTipsHomePage />
            </VStack>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}
