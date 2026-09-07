import { FundingItem, SecondaryMarketItem } from "@/api/model/investment-model";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export type InvestmentCardProps =
  | { type: "primary"; item: FundingItem; onPress: () => void }
  | { type: "secondary"; item: SecondaryMarketItem; onPress: () => void };

export const InvestmentCard = (props: InvestmentCardProps) => {
  const { onPress } = props;

  if (props.type === "primary") {
    const { item } = props;
    return (
      <Pressable
        onPress={onPress}
        className="rounded-2xl bg-surface border border-surface-border p-4 gap-3"
      >
        {/* Top Header: Company badge & Timestamp */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-primary-deep/20 items-center justify-center border border-primary-deep/30">
              <Text className="text-xs font-bold text-primary">
                {item.company?.charAt(0) ?? "C"}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-bold text-foreground">
                {item.company}
              </Text>
              {item.author?.name ? (
                <Text className="text-[11px] text-dim-text">
                  By {item.author.name}
                </Text>
              ) : null}
            </View>
          </View>
          <Text className="text-xs text-dim-text">{item.timestamp}</Text>
        </View>

        {/* Content */}
        <Text
          className="text-[14px] text-foreground leading-snug font-medium"
          numberOfLines={3}
        >
          {item.content}
        </Text>

        {/* Primary Metrics Row: Amount & Valuation */}
        <View className="flex-row items-center justify-between pt-2 border-t border-surface-border/50">
          <View className="flex-row items-center gap-1.5 bg-primary-deep/10 border border-primary-deep/20 px-3 py-1.5 rounded-xl">
            <Text className="text-xs font-medium text-dim-text">Amount:</Text>
            <Text className="text-xs font-bold text-primary">
              {item.amount && item.amount !== "N/A" ? item.amount : "Undisclosed"}
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5 bg-surface-elevated border border-surface-border px-3 py-1.5 rounded-xl">
            <Text className="text-xs font-medium text-dim-text">Valuation:</Text>
            <Text className="text-xs font-bold text-foreground">
              {item.valuation ?? "N/A"}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  // Secondary Market Card
  const { item } = props;
  const isUp = item.direction === "up";
  const trendColor = isUp ? "#22c55e" : "#ef4444";
  const trendBg = isUp ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)";
  const trendBorder = isUp ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)";

  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl bg-surface border border-surface-border p-4 gap-3"
    >
      {/* Top Header: Ticker badge & Timestamp */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="px-2.5 py-1 rounded-lg bg-surface-elevated border border-surface-border">
            <Text className="text-xs font-extrabold text-foreground tracking-wider">
              ${item.ticker}
            </Text>
          </View>
          {item.author?.name ? (
            <Text className="text-[11px] text-dim-text">
              By {item.author.name}
            </Text>
          ) : null}
        </View>
        <Text className="text-xs text-dim-text">{item.timestamp}</Text>
      </View>

      {/* Content */}
      <Text
        className="text-[14px] text-foreground leading-snug font-medium"
        numberOfLines={3}
      >
        {item.content}
      </Text>

      {/* Secondary Metrics Row: Price & Direction */}
      <View className="flex-row items-center justify-between pt-2 border-t border-surface-border/50">
        <View className="flex-row items-center gap-1.5 bg-surface-elevated border border-surface-border px-3 py-1.5 rounded-xl">
          <Text className="text-xs font-medium text-dim-text">Ticker:</Text>
          <Text className="text-xs font-bold text-foreground">{item.ticker}</Text>
        </View>

        <View
          className="flex-row items-center gap-1 px-3 py-1.5 rounded-xl border"
          style={{ backgroundColor: trendBg, borderColor: trendBorder }}
        >
          <Ionicons
            name={isUp ? "trending-up-outline" : "trending-down-outline"}
            size={14}
            color={trendColor}
          />
          <Text className="text-xs font-bold capitalize" style={{ color: trendColor }}>
            {item.price && item.price.trim() !== "" ? item.price : item.direction}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
