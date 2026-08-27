import { MarketNewsResponse } from "@/api/model/investment-model";
import { LanguageCode } from "@/api/model/language-model";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useInvestmentNews } from "@/hooks/useInvestmentNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import React from "react";
import { Text } from "react-native";
import MarketMoves from "./marketMoves";
import TopFunding from "./topFunding";
import ValuationWatch from "./valuationFunding";

export interface FundingComponentProps {
  investmentData: MarketNewsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ReturnType<typeof useInvestmentNews>["error"];
  languageCode: LanguageCode;
}

const InvestmentHomePage = () => {
  const { investmentData, isLoading, isError, error } = useInvestmentNews();

  const languageCode = useLanguageStore((state) => state.languageCode);

  return (
    <VStack className="gap-3">
      <VStack>
        <SectionHeading>Investment Intel</SectionHeading>
        <Text className="text-sm text-muted-foreground mt-1">
          Track AI funding, valuations, market moves, and major deals.
        </Text>
      </VStack>
      <VStack className="gap-4">
        <TopFunding
          investmentData={investmentData}
          isLoading={isLoading}
          isError={isError}
          error={error}
          languageCode={languageCode}
        />

        <ValuationWatch
          investmentData={investmentData}
          isLoading={isLoading}
          isError={isError}
          error={error}
          languageCode={languageCode}
        />

        <MarketMoves
          investmentData={investmentData}
          isLoading={isLoading}
          isError={isError}
          error={error}
          languageCode={languageCode}
        />
      </VStack>
    </VStack>
  );
};

export default InvestmentHomePage;
