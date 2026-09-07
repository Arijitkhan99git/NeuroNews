import { SecondaryMarketItem } from "@/api/model/investment-model";
import { BlurView } from "expo-blur";
import { ArrowRight, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface MarketMoveDetailModalProps {
  visible: boolean;
  items: SecondaryMarketItem[];
  initialIndex: number;
  onClose: () => void;
}

const MarketMoveDetailModal = ({
  visible,
  items,
  initialIndex,
  onClose,
}: MarketMoveDetailModalProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconActive = isDark ? "#b9a0f8cc" : "#6D28D9";
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (visible && listRef.current && items.length > 0) {
      const timer = setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: Math.min(initialIndex, items.length - 1),
          animated: false,
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [visible, initialIndex, items.length]);

  const handleArticleUrl = async (item: SecondaryMarketItem) => {
    if (!item.sourceUrl) return;
    const supported = await Linking.canOpenURL(item.sourceUrl);
    if (supported) {
      await Linking.openURL(item.sourceUrl);
    }
  };

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: SecondaryMarketItem; index: number }) => {
      const isFirst = index === 0;
      const isLast = index === items.length - 1;
      const swipeHint = isFirst
        ? "Swipe right for more"
        : isLast
          ? "Swipe left to go back"
          : "Swipe left or right for more";

      const isUp = item.direction === "up";
      const trendColor = isUp ? "#22c55e" : "#ef4444";
      const trendBg = isUp ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)";
      const trendBorder = isUp ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)";

      return (
        <View
          style={{ width: SCREEN_WIDTH }}
          className="items-center justify-center px-6"
        >
          {/* Close button — right-aligned above the card */}
          <View className="w-full flex-row justify-end mb-3">
            <Pressable
              onPress={onClose}
              hitSlop={12}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: "rgba(30,30,40,0.85)",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              <X size={17} color="#9ca3af" />
            </Pressable>
          </View>

          {/* Card */}
          <View className="w-full rounded-3xl bg-card border border-border py-8 px-6 gap-4">
            {/* Header Badges: Ticker & Direction */}
            <View className="flex-row items-center justify-between">
              <View className="px-3 py-1.5 rounded-xl bg-surface-elevated border border-border">
                <Text className="text-sm font-extrabold text-foreground tracking-wider">
                  {item.ticker}
                </Text>
              </View>

              {item.direction && (
                <View
                  className="flex-row items-center gap-1 px-3 py-1.5 rounded-xl border"
                  style={{ backgroundColor: trendBg, borderColor: trendBorder }}
                >
                  <Text className="text-xs font-bold" style={{ color: trendColor }}>
                    {isUp ? "↗" : "↘"} {item.direction.toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            {/* Description content */}
            <Text className="text-foreground text-base tracking-wide leading-6 font-medium">
              {item.content}
            </Text>

            {/* Details row: Price, Change, Market Cap */}
            <View className="pt-3 border-t border-border/60 flex-row flex-wrap gap-x-6 gap-y-2">
              {item.price ? (
                <View>
                  <Text className="text-xs text-muted-foreground">Price</Text>
                  <Text className="text-sm font-bold text-foreground">
                    {item.price}
                  </Text>
                </View>
              ) : null}

              {item.change ? (
                <View>
                  <Text className="text-xs text-muted-foreground">Change</Text>
                  <Text className="text-sm font-bold" style={{ color: trendColor }}>
                    {item.change}
                  </Text>
                </View>
              ) : null}

              {item.marketCap ? (
                <View>
                  <Text className="text-xs text-muted-foreground">Market Cap</Text>
                  <Text className="text-sm font-bold text-foreground">
                    {item.marketCap}
                  </Text>
                </View>
              ) : null}

              <View>
                <Text className="text-xs text-muted-foreground">Date</Text>
                <Text className="text-sm font-bold text-foreground">
                  {item.timestamp}
                </Text>
              </View>
            </View>

            {/* Source */}
            {item.author?.name ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-muted-foreground text-sm">Source:</Text>
                <Text className="text-foreground text-sm font-semibold">
                  {item.author.name}
                </Text>
              </View>
            ) : null}

            {/* Read full article link */}
            {item.sourceUrl ? (
              <Pressable
                onPress={() => handleArticleUrl(item)}
                className="flex-row items-center gap-1.5 mt-1"
              >
                <Text className="text-primary text-sm font-semibold">
                  Read full article
                </Text>
                <ArrowRight color={iconActive} size={14} />
              </Pressable>
            ) : null}
          </View>

          {/* Swipe hint */}
          {items.length > 1 && (
            <Text className="text-muted-foreground text-xs mt-4 opacity-60">
              {swipeHint}
            </Text>
          )}
        </View>
      );
    },
    [items.length, iconActive, onClose]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <BlurView intensity={100} tint="dark" style={{ flex: 1 }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
          pointerEvents="none"
        />

        <View
          style={{ flex: 1, justifyContent: "center" }}
          pointerEvents="box-none"
        >
          <FlatList
            ref={listRef}
            data={items}
            horizontal
            pagingEnabled
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            initialScrollIndex={Math.min(initialIndex, items.length - 1)}
            windowSize={3}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

export default MarketMoveDetailModal;
