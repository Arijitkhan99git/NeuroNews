import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useMemo } from "react";
import { FundingComponentProps } from "..";
import ValuationCard from "./ValuationCard";

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
    return <Text className="text-muted-foreground">Loading valuations...</Text>;
  }

  if (isError) {
    return (
      <Text className="text-red-400">
        {error instanceof Error ? error.message : "Failed to load valuations"}
      </Text>
    );
  }

  if (!valuations.length) {
    return (
      <Text className="text-muted-foreground">
        No valuation data available.
      </Text>
    );
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
