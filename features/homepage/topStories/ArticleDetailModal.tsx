import { NewsItem } from "@/api/model/techNews-model";
import CustomBadge from "@/components/utils/Badge";
import ImpactBadge from "@/components/utils/ImpactBadge";
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

interface ArticleDetailModalProps {
  visible: boolean;
  items: NewsItem[];
  initialIndex: number;
  onClose: () => void;
}

const ArticleDetailModal = ({
  visible,
  items,
  initialIndex,
  onClose,
}: ArticleDetailModalProps) => {
  const { colorScheme } = useColorScheme();
  const iconActive = colorScheme === "dark" ? "#b9a0f8cc" : "#6D28D9";
  const listRef = useRef<FlatList>(null);

  // Scroll to the tapped card whenever the modal opens or the starting index changes
  useEffect(() => {
    if (visible && listRef.current && items.length > 0) {
      // Use a short delay so the FlatList has rendered before we scroll
      const timer = setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [visible, initialIndex, items.length]);

  const handleArticleUrl = async (item: NewsItem) => {
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
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: NewsItem; index: number }) => {
      const isFirst = index === 0;
      const isLast = index === items.length - 1;
      const swipeHint = isFirst
        ? "Swipe right for more"
        : isLast
          ? "Swipe left to go back"
          : "Swipe left or right for more";

      return (
        <View
          style={{ width: SCREEN_WIDTH }}
          className="items-center justify-center px-6"
        >
          {/* Close button — sits flush above the card, right-aligned */}
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
            {/* Badges row */}
            <View className="flex-row items-center gap-2 flex-wrap">
              <CustomBadge text={item.category} />
              <ImpactBadge impact={item.impact} />
            </View>

            {/* Content */}
            <Text className="text-primaryText text-base tracking-wide leading-6">
              {item.content}
            </Text>

            {/* Source */}
            <View className="flex-row items-center gap-2">
              <Text className="text-muted-foreground text-sm">Source:</Text>
              <Text className="text-foreground text-sm font-semibold">
                {item.source}
              </Text>
            </View>

            {/* Read full article */}
            <Pressable
              onPress={() => handleArticleUrl(item)}
              className="flex-row items-center gap-1 mt-2"
            >
              <Text className="text-muted-foreground text-sm">Read full article</Text>
              <ArrowRight color={iconActive} size={14} />
            </Pressable>
          </View>

          {/* Position-aware swipe hint */}
          {items.length > 1 && (
            <Text className="text-muted-foreground text-xs mt-4 opacity-60">
              {swipeHint}
            </Text>
          )}
        </View>
      );
    },
    [items.length, onClose],
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
        {/* Dark overlay */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
          pointerEvents="none"
        />


        {/* FlatList — centred vertically; box-none lets the backdrop Pressable
            catch taps on the empty space above/below the card */}
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
            initialScrollIndex={initialIndex}
            windowSize={3}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

export default ArticleDetailModal;
