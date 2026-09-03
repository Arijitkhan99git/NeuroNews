import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useTrendingNews } from "@/hooks/useTrendingNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import TrendingCard from "./TrendingCard";

const TrendingHomePage = () => {
  const { trendingData, isLoading, isError, error } = useTrendingNews();
  const languageCode = useLanguageStore((s) => s.languageCode);

  const data = trendingData
    ? trendingData.trends[languageCode].slice(0, 3)
    : [];

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

          <ArrowRight size={18} color="#b9a0f8cc" />
        </Pressable>
      </HStack>

      <View className="rounded-2xl bg-card border border-border px-4">
        {data?.map((item, index) => (
          <TrendingCard
            key={`${item.title}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </View>
    </VStack>
  );
};

export default TrendingHomePage;
