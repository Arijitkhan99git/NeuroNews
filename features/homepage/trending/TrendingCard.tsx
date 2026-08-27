import { TrendItem } from "@/api/model/trending-model";
import { ArrowUpRight, Sparkles } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface TrendingCardProps {
  item: TrendItem;
  index: number;
}

const TrendingCard = ({ item, index }: TrendingCardProps) => {
  return (
    <Pressable className="flex-row py-4 border-b border-border">
      {/* Rank */}
      <View className="ml-1 mr-3">
        <Text className="text-sm font-bold text-gray-400">
          {String(index + 1).padStart(2, "0")}
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1">
        {/* Category */}
        <View className="self-start rounded-md bg-badgebackground px-2 py-1 mb-2">
          <Text className="text-badgeText text-[10px] font-semibold">
            {item.category}
          </Text>
        </View>

        {/* Title */}
        <Text
          numberOfLines={2}
          className="text-base font-semibold text-heading leading-5"
        >
          {item.title}
        </Text>

        {/* Meta */}
        <View className="flex-row items-center mt-2">
          <View className="flex-row items-center">
            <Sparkles size={11} color="#10B981" />

            <Text className="ml-1 text-[10px] font-semibold text-emerald-400">
              {item.momentum.toUpperCase()}
            </Text>
          </View>

          <Text className="text-xs text-muted-foreground ml-2">•</Text>

          <Text className="text-xs text-muted-foreground ml-2">
            {item.streak} day streak
          </Text>
        </View>
      </View>

      {/* Arrow */}
      <View className="justify-center ml-2">
        <ArrowUpRight size={18} color="#6B7280" />
      </View>
    </Pressable>
  );
};

export default TrendingCard;
