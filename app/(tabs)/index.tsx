import { Box } from "@/components/ui/box";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        {/* <LinearGradient
          colors={["#3B82F6", "#6366F1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            bottom: 140,
            right: 40,
            width: 60,
            height: 60,
            borderRadius: 30,
            overflow: "hidden",
          }}
        >
          <Box className="flex-1 justify-center items-center">
           
          </Box>
        </LinearGradient> */}
      </SafeAreaView>
    </Box>
  );
}
