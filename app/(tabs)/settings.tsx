import AppIcon from "@/components/appIcon/AppIcon";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import Appearance from "@/features/settings/apperance/appearance";
import { PreferencesSection } from "@/features/settings/preferences/PreferencesSection";
import System from "@/features/settings/system";
import React from "react";
import { ScrollView, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        {/* Settings Header */}
        <Box className="flex flex-row gap-2 items-center">
          <AppIcon />
          <Text className="text-gray-600 dark:text-gray-300 text-3xl font-semibold">
            Settings
          </Text>
        </Box>

        <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
          <VStack className="gap-8">
            <Appearance />
            <PreferencesSection />
            <System />
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
};
export default Settings;
