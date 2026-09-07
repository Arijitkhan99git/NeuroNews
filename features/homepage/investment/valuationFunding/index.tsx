import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { View } from "react-native";
import { FundingComponentProps } from "..";
import ValuationCard from "./ValuationCard";

const ValuationWatchSkeleton = () => (
  <VStack className="gap-3">
    <Text className="mb-1 text-lg font-semibold text-foreground">
      💎 Valuation Watch
    </Text>
    {[1, 2].map((i) => (
      <View key={i} className="rounded-xl bg-card border border-border p-4">
        <View className="flex-row items-center justify-between">
          <View className="gap-1.5 flex-1">
            <View className="h-4 w-32 rounded bg-surface-border" />
            <View className="h-3 w-40 rounded bg-surface-border mt-1" />
          </View>
          <View className="h-5 w-16 rounded bg-surface-border" />
        </View>
      </View>
    ))}
  </VStack>
);

const ValuationWatch = ({
  investmentData,
  isLoading,
  isError,
  error,
  languageCode,
}: FundingComponentProps) => {
  const valuations = useMemo(() => {
    const primaryMarket = investmentData?.primaryMarket?.[languageCode] ?? [];

    return primaryMarket
      .filter((item) => item.valuation && item.valuation !== "N/A")
      .map((item) => ({
        id: item.id,
        company: item.company,
        valuation: item.valuation,
        detail: item.investors?.[0] || item.round || "Investment",
      }));
  }, [investmentData, languageCode]);

  if (isLoading) {
    return <ValuationWatchSkeleton />;
  }

  if (isError) {
    return (
      <VStack className="gap-3">
        <Text className="mb-1 text-lg font-semibold text-foreground">
          💎 Valuation Watch
        </Text>
        <View className="rounded-xl bg-card border border-red-500/20 p-4 flex-row items-center gap-2">
          <Ionicons name="alert-circle-outline" size={20} color="#f87171" />
          <Text className="text-destructive text-sm font-medium flex-1">
            {error instanceof Error ? error.message : "Failed to load valuation data"}
          </Text>
        </View>
      </VStack>
    );
  }

  if (!valuations.length) {
    return null;
  }

  return (
    <VStack className="gap-3">
      <Text className="mb-1 text-lg font-semibold text-foreground">
        💎 Valuation Watch
      </Text>

      {valuations.map((item) => (
        <ValuationCard
          key={item.id}
          company={item.company}
          valuation={item.valuation!}
          detail={item.detail}
        />
      ))}
    </VStack>
  );
};

export default ValuationWatch;
