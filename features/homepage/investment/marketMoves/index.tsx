import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useMemo } from "react";
import { FundingComponentProps } from "..";
import MarketMoveItem from "./MarketMoveItem";

const MarketMoves = ({
  investmentData,
  isLoading,
  isError,
  error,
  languageCode,
}: FundingComponentProps) => {
  const marketMoves = useMemo(() => {
    return (investmentData?.secondaryMarket?.[languageCode] ?? []).slice(0, 5);
  }, [investmentData, languageCode]);

  if (isLoading) {
    return <Text>Loading market activity...</Text>;
  }

  if (isError) {
    return (
      <Text className="text-red-400">
        {error instanceof Error
          ? error.message
          : "Failed to load market activity"}
      </Text>
    );
  }

  if (!marketMoves.length) {
    return (
      <Text className="text-muted-foreground">
        No market activity available.
      </Text>
    );
  }

  return (
    <VStack className="rounded-2xl bg-card px-4">
      {/* Header */}
      <VStack className="border-b border-border py-4">
        <Text className="text-lg font-bold text-foreground">
          📈 Market Moves
        </Text>

        <Text className="mt-1 text-sm text-muted-foreground">
          Latest public-market activity and major capital movements.
        </Text>
      </VStack>

      {/* Market items */}
      {marketMoves.map((item) => (
        <MarketMoveItem
          key={item.id}
          ticker={item.ticker}
          description={item.content}
          price={item.price}
          change={item.change}
          timestamp={item.timestamp}
          direction={item.direction}
        />
      ))}
    </VStack>
  );
};

export default MarketMoves;
