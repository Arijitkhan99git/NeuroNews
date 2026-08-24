import { Box } from "@/components/ui/box";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Saved = () => {
  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}></SafeAreaView>
    </Box>
  );
};

export default Saved;
