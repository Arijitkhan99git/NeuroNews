import { NewsItem } from "@/api/model/techNews-model";
import CustomBadge from "@/components/utils/Badge";
import ImpactBadge from "@/components/utils/ImpactBadge";
import { useTechNewsFilterStore } from "@/features/filterModal/filterStore/useTechNewsFilterStore";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { styled } from "nativewind";

import React, { useCallback, useMemo, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SafeAreaView = styled(RNSafeAreaView);

const NewsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const techNews = useTechNewsFilterStore((s) => s.techNews);
  const listRef = useRef<FlatList>(null);

  const initialIndex = useMemo(
    () => Math.max(techNews?.findIndex((s) => String(s.id) === id) ?? -1, 0),
    [techNews, id],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    [],
  );

  const handleArticleUrl = async (item: NewsItem) => {
    if (!item.sourceUrl) return;

    const supported = await Linking.canOpenURL(item.sourceUrl);

    if (supported) {
      await Linking.openURL(item.sourceUrl);
    } else {
      console.warn(`Cannot open URL: ${item.sourceUrl}`);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: NewsItem }) => (
      <View
        style={{
          height: SCREEN_HEIGHT,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <View className="gap-3">
          <View className="flex-row items-center gap-2">
            <CustomBadge text={item.category} />
            <ImpactBadge impact={item.impact} />
          </View>

          <Text className="text-secondaryText mb-2 text-lg tracking-wide py-5">
            {item.content}
          </Text>

          <View className="flex items-center flex-row gap-2">
            <Text className="text-primaryText text-sm">Source Name:</Text>
            <Text className="text-gray-400 font-semibold ">{item.source}</Text>
          </View>

          <Pressable
            onPress={() => handleArticleUrl(item)}
            className="flex-row items-center gap-1 mt-6"
          >
            <Text className="text-muted text-sm">Read full article</Text>
            <ArrowRight color="#b9a0f8cc" size={14} />
          </Pressable>
        </View>
      </View>
    ),
    [],
  );

  if (techNews?.length === 0) return null;

  return (
    <SafeAreaView
      className="flex-1 bg-background dark:bg-darkBackground"
      edges={["top"]}
    >
      <View className="py-5">
        <Pressable
          onPress={() => router.replace("/news")}
          className="flex flex-row gap-2 mb-4 px-5"
        >
          <Ionicons
            name="arrow-back-outline"
            size={22}
            className="text-muted-foreground dark:text-darkMuted-foreground"
          />
          <Text className="text-muted-foreground dark:text-darkMuted-foreground">
            Go back
          </Text>
        </Pressable>
        <FlatList
          ref={listRef}
          data={techNews}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          pagingEnabled
          showsVerticalScrollIndicator={true}
          initialScrollIndex={initialIndex}
          getItemLayout={getItemLayout}
          decelerationRate="fast"
          snapToInterval={SCREEN_HEIGHT}
          snapToAlignment="start"
          windowSize={3}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default NewsDetails;
