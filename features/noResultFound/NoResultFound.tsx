import { LucideIcon, SearchX } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface NoResultsFoundProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  iconSize?: number;
}

const NoResultsFound = ({
  icon: Icon = SearchX,
  title = "No Result Found!",
  description,
  iconSize = 40,
}: NoResultsFoundProps) => {
  return (
    <View className="items-center justify-center py-16 px-6">
      <View className="w-20 h-20 rounded-full  items-center justify-center mb-1">
        <Icon color="#9ca3af" size={iconSize} strokeWidth={1.5} />
      </View>

      <Text className="text-foreground text-base font-semibold text-center">
        {title}
      </Text>

      {description ? (
        <Text className="text-muted-foreground text-sm text-center mt-1 max-w-[260px]">
          {description}
        </Text>
      ) : null}
    </View>
  );
};

export default NoResultsFound;
