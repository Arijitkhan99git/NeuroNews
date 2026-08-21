import CreateOccasion from "@/components/ui/modals/createOccasion";
import { colors, components } from "@/constants/theme";
import { Tabs } from "expo-router";
import { CalendarDays, House, Settings } from "lucide-react-native";
import React, { useState } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const tabBar = components.tabBar;
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  return (
    <>
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
            tabBarIcon: ({ color, size }) => (
              <House color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <CalendarDays color={color} size={size} />
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

      <CreateOccasion
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSubmit={() => setIsCreateModalVisible(false)}
      />
    </>
  );
};

export default TabLayout;
