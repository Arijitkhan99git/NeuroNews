import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { getDetail, getSector, parseAmount } from "@/hooks/useInvestmentHooks";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { View } from "react-native";
import { FundingComponentProps } from "..";
import FundingCard from "./FundingCard";

const TopFundingSkeleton = () => (
  <VStack className="gap-1">
    <Text className="mb-3 mt-3 text-lg font-semibold text-foreground">
      🚀 Top Funding
    </Text>
    {[1, 2].map((i) => (
      <View key={i} className="mb-3 rounded-xl bg-card border border-border p-4 gap-2">
        <View className="flex-row items-center justify-between">
          <View className="h-4 w-32 rounded bg-surface-border" />
          <View className="h-5 w-16 rounded bg-surface-border" />
        </View>
        <View className="h-3 w-48 rounded bg-surface-border mt-1" />
      </View>
    ))}
  </VStack>
);

const TopFunding = ({
  investmentData,
  isLoading,
  isError,
  error,
  languageCode,
}: FundingComponentProps) => {
  const topFunding = useMemo(() => {
    const primaryMarket = investmentData?.primaryMarket?.[languageCode] ?? [];

    return [...primaryMarket]
      .filter((item) => item.amount && item.amount !== "N/A")
      .sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount))
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        company: item.company,
        amount: item.amount,
        sector: getSector(item.content),
        detail: getDetail(item.investors, item.round, item.roundCategory),
      }));
  }, [investmentData, languageCode]);

  if (isLoading) {
    return <TopFundingSkeleton />;
  }

  if (isError) {
    return (
      <VStack className="gap-1">
        <Text className="mb-3 mt-3 text-lg font-semibold text-foreground">
          🚀 Top Funding
        </Text>
        <View className="rounded-xl bg-card border border-red-500/20 p-4 flex-row items-center gap-2">
          <Ionicons name="alert-circle-outline" size={20} color="#f87171" />
          <Text className="text-destructive text-sm font-medium flex-1">
            {error instanceof Error ? error.message : "Failed to load funding data"}
          </Text>
        </View>
      </VStack>
    );
  }

  if (!topFunding.length) {
    return null;
  }

  return (
    <VStack className="gap-1">
      <Text className="mb-3 mt-3 text-lg font-semibold text-foreground">
        🚀 Top Funding
      </Text>

      {topFunding.map((item) => (
        <FundingCard
          key={item.id}
          company={item.company}
          amount={item.amount}
          sector={item.sector}
          detail={item.detail}
        />
      ))}
    </VStack>
  );
};

export default TopFunding;
