import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { FundingComponentProps } from "..";
import MarketMoveDetailModal from "./MarketMoveDetailModal";
import MarketMoveItem from "./MarketMoveItem";

const MarketMovesSkeleton = () => (
  <VStack className="rounded-2xl bg-card px-4 border border-border">
    <VStack className="border-b border-border py-4">
      <Text className="text-lg font-bold text-foreground">
        📈 Market Moves
      </Text>
      <Text className="mt-1 text-sm text-muted-foreground">
        Latest public-market activity and major capital movements.
      </Text>
    </VStack>
    {[1, 2, 3].map((i) => (
      <View key={i} className="border-b border-border py-4 gap-2">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 flex-row items-center gap-3">
            <View className="h-5 w-12 rounded bg-surface-border" />
            <View className="flex-1 gap-1">
              <View className="h-3.5 w-full rounded bg-surface-border" />
              <View className="h-3.5 w-3/4 rounded bg-surface-border" />
            </View>
          </View>
          <View className="h-4 w-12 rounded bg-surface-border ml-2" />
        </View>
        <View className="h-3 w-20 rounded bg-surface-border mt-1" />
      </View>
    ))}
  </VStack>
);

const MarketMoves = ({
  investmentData,
  isLoading,
  isError,
  error,
  languageCode,
}: FundingComponentProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const marketMoves = useMemo(() => {
    return (investmentData?.secondaryMarket?.[languageCode] ?? []).slice(0, 5);
  }, [investmentData, languageCode]);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalVisible(true);
  };

  if (isLoading) {
    return <MarketMovesSkeleton />;
  }

  if (isError) {
    return (
      <VStack className="rounded-2xl bg-card border border-red-500/20 px-4 py-4 gap-2">
        <Text className="text-lg font-bold text-foreground">📈 Market Moves</Text>
        <View className="flex-row items-center gap-2">
          <Ionicons name="alert-circle-outline" size={20} color="#f87171" />
          <Text className="text-destructive text-sm font-medium flex-1">
            {error instanceof Error
              ? error.message
              : "Failed to load market activity"}
          </Text>
        </View>
      </VStack>
    );
  }

  if (!marketMoves.length) {
    return null;
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
      {marketMoves.map((item, index) => (
        <MarketMoveItem
          key={item.id}
          ticker={item.ticker}
          description={item.content}
          price={item.price}
          change={item.change}
          timestamp={item.timestamp}
          direction={item.direction}
          onPress={() => handleOpenModal(index)}
        />
      ))}

      {/* Modal for item details */}
      <MarketMoveDetailModal
        visible={isModalVisible}
        items={marketMoves}
        initialIndex={selectedIndex}
        onClose={() => setIsModalVisible(false)}
      />
    </VStack>
  );
};

export default MarketMoves;
