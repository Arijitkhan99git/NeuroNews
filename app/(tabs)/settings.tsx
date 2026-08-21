import AppIcon from "@/components/appIcon/AppIcon";
import Appearance from "@/components/settings/preferences/appearance";
import UserImage from "@/components/settings/userImage";
import { Box } from "@/components/ui/box";
import React from "react";
import { Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        {/* Settings Header */}
        <Box className="flex flex-row gap-1 items-center">
          <AppIcon />
          <Text className="text-gray-300 text-3xl font-semibold">Settings</Text>
        </Box>

        <UserImage />
        <Appearance />
      </SafeAreaView>
    </Box>
  );
};
export default Settings;
