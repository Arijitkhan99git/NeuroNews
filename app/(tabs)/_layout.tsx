import { colors, components } from "@/constants/theme";
import { Tabs } from "expo-router";
import { CirclePlus, House, Settings } from "lucide-react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const tabBar = components.tabBar;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: 40,
          borderRadius: tabBar.radius,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
        },
        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="createOccasion"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <CirclePlus color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
