import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useInvestmentNews } from "@/hooks/useInvestmentNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import React, { useMemo } from "react";
import FundingCard from "./FundingCard";

const parseAmount = (amount: string): number => {
  const value = parseFloat(amount.replace(/[^0-9.]/g, ""));

  if (Number.isNaN(value)) {
    return 0;
  }

  if (amount.includes("B")) {
    return value * 1000;
  }

  if (amount.includes("K")) {
    return value / 1000;
  }

  return value;
};

const getSector = (content: string): string => {
  const text = content.toLowerCase();

  if (text.includes("robotic")) return "Robotics";
  if (text.includes("cybersecurity")) return "Cybersecurity";
  if (text.includes("energy")) return "Energy";
  if (text.includes("infrastructure")) return "Infrastructure";
  if (text.includes("health")) return "Healthcare";
  if (text.includes("fintech")) return "Fintech";

  return "Technology";
};

const getDetail = (
  investors: string[],
  round: string,
  roundCategory: string,
): string => {
  const investor = investors?.find((item) => item && item.trim());

  if (investor) {
    return investor;
  }

  if (round && round !== "Unknown") {
    return round;
  }

  if (roundCategory && roundCategory !== "Unknown") {
    return roundCategory;
  }

  return "Funding";
};

const TopFunding = () => {
  const { investmentData, isLoading, isError, error } = useInvestmentNews();

  const languageCode = useLanguageStore((state) => state.languageCode);

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
