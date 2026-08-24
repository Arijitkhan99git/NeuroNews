import AppIcon from "@/components/appIcon/AppIcon";
import { Box } from "@/components/ui/box";
import { GradientText } from "@/components/utils/GradientText";
import { useThemeStore } from "@/store/useThemeStore";
import { Bell } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const DashboardHeader = () => {
  const today = new Date();

  // Format: "Monday, August 24"
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  } as const;

  const formattedDate = today.toLocaleDateString("en-US", options);

  const getGreeting = () => {
    const hour = new Date().getHours(); // 0–23

    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };

  const mode = useThemeStore((s) => s.mode);
  const gradientColors =
    mode === "dark"
      ? (["#9DB2BF", "#ffffff"] as const)
      : (["#6366f1", "#8b5cf6"] as const);

  return (
    <View>
      <View className="flex flex-row justify-between">
        <Box className="flex flex-row gap-2 items-center">
          <AppIcon />
          <Text className="text-primary text-2xl font-semibold">
            NEURO NEWS
          </Text>
        </Box>

        <Box className="p-3 rounded-xl bg-gray-700 flex justify-center items-center self-center">
          <Bell color="#FFFFFF" strokeWidth={2} size={23} />
        </Box>
      </View>

      <View className="gap-1 mt-10">
        <Text className="text-sky-500">{formattedDate}</Text>
        <Text className="text-gray-200 font-semibold text-5xl py-1">
          {getGreeting()}
        </Text>
        <GradientText
          className="text-lg"
          colors={gradientColors} // pick colors matching your dark theme tokens
        >
          Your daily intelligence on AI.
        </GradientText>
      </View>
    </View>
  );
};

export default DashboardHeader;
