import React from "react";
import { Text, View } from "react-native";

interface BadgeProps {
  text: string;
}

const CustomBadge = ({ text }: BadgeProps) => {
  return (
    <View className="self-start rounded-full bg-badgebackground flex items-center justify-center px-2 py-1">
      <Text
        className="text-badgeText"
        style={{
          fontSize: 12,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default CustomBadge;
