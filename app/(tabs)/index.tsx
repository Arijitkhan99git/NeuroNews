import { Box } from "@/components/ui/box";
import AiDaily from "@/features/homepage/aiDaily";
import DashboardHeader from "@/features/homepage/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <DashboardHeader />
        <AiDaily />
      </SafeAreaView>
    </Box>
  );
}
