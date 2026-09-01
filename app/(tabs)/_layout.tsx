import { components } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import {
  Bookmark,
  House,
  Newspaper,
  Settings,
  TrendingUp,
} from "lucide-react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const tabBar = components.tabBar;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
          tabBarStyle: {
            position: "absolute",
            bottom: Math.max(insets.bottom, tabBar.horizontalInset),
            height: tabBar.height,
            marginHorizontal: 30,
            borderRadius: tabBar.radius,
            backgroundColor: "transparent",
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={["#4d45de", "#805bd7"]} // primary → secondary, or whatever you want
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                borderRadius: tabBar.radius, // match tabBarStyle so corners aren't square
                overflow: "hidden",
              }}
            />
          ),
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
          name="news"
          options={{
            title: "News",
            tabBarIcon: ({ color, size }) => (
              <Newspaper color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="trends"
          options={{
            title: "Trends",
            tabBarIcon: ({ color, size }) => (
              <TrendingUp color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color, size }) => (
              <Bookmark color={color} size={size} />
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
    </>
  );
};

export default TabLayout;
