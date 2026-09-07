import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { getDetail, getSector, parseAmount } from "@/hooks/useInvestmentHooks";
import React, { useMemo } from "react";
import { FundingComponentProps } from "..";
import FundingCard from "./FundingCard";


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
    return <Text className="text-muted-foreground">Loading funding...</Text>;
  }

  if (isError) {
    return (
      <Text className="text-red-400">
        {error instanceof Error ? error.message : "Failed to load funding data"}
      </Text>
    );
  }

  if (!topFunding.length) {
    return (
      <Text className="text-muted-foreground">No funding data available.</Text>
    );
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
