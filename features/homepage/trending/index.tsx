import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useTrendingNews } from "@/hooks/useTrendingNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import { router } from "expo-router";
import { AlertCircle, ArrowRight, TrendingUp } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";
import TrendingCard from "./TrendingCard";
import TrendingCardSkeleton from "./TrendingCardSkeleton";

const SKELETON_COUNT = 3;

const TrendingHomePage = () => {
  const colorScheme = useColorScheme();
  const iconMuted = colorScheme === "dark" ? "#9CA3AF" : "#64748b";
  const iconActive = colorScheme === "dark" ? "#b9a0f8cc" : "#6D28D9";

  const { trendingData, isLoading, isError, error } = useTrendingNews();
  const languageCode = useLanguageStore((s) => s.languageCode);

  const data = trendingData
    ? trendingData.trends[languageCode].slice(0, 3)
    : [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="rounded-2xl bg-card border border-border px-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <TrendingCardSkeleton key={i} />
          ))}
        </View>
      );
    }

    if (isError) {
      return (
        <View className="rounded-2xl bg-card border border-border px-4 py-6 items-center justify-center gap-2">
          <AlertCircle size={22} color={iconMuted} />
          <Text className="text-muted-foreground text-sm text-center">
            Could not load trending topics.
          </Text>
          {error?.message ? (
            <Text className="text-muted-foreground text-xs text-center opacity-70">
              {error.message}
            </Text>
          ) : null}
        </View>
      );
    }

    if (data.length === 0) {
      return (
        <View className="rounded-2xl bg-card border border-border px-4 py-6 items-center justify-center gap-2">
          <TrendingUp size={22} color={iconMuted} />
          <Text className="text-muted-foreground text-sm text-center">
            No trending topics right now.
          </Text>
        </View>
      );
    }

    return (
      <View className="rounded-2xl bg-card border border-border px-4">
        {data.map((item, index) => (
          <TrendingCard
            key={`${item.title}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </View>
    );
  };

  return (
    <VStack>
      <HStack className="items-center justify-between mb-5">
        <VStack>
          <SectionHeading>Trending Now</SectionHeading>

          <Text className="text-sm text-muted-foreground mt-1">
            What&apos;s gaining attention today
          </Text>
        </VStack>

        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => router.push("/(tabs)/trends")}
        >
          <Text className="text-sm text-secondary">View All</Text>

          <ArrowRight size={18} color={iconActive} />
        </Pressable>
      </HStack>

      {renderContent()}
    </VStack>
  );
};

export default TrendingHomePage;
