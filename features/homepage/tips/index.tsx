import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useAITips } from "@/hooks/useAITips";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, View } from "react-native";
import TipCard from "./TipCard";

const AiTipsSkeleton = () => (
  <VStack className="gap-4">
    <VStack className="mb-2">
      <SectionHeading>AI Tips</SectionHeading>
      <Text className="mt-1 text-sm text-muted-foreground">
        Practical ways to get more from AI
      </Text>
    </VStack>

    {[1, 2].map((i) => (
      <View key={i} className="rounded-2xl bg-card border border-border p-4 gap-3">
        <View className="flex-row items-center justify-between">
          <View className="h-5 w-20 rounded-full bg-surface-border" />
          <View className="h-4 w-16 rounded bg-surface-border" />
        </View>

        <View className="h-4 w-[90%] rounded bg-surface-border mt-2" />
        <View className="h-4 w-[70%] rounded bg-surface-border mt-1" />

        <View className="mt-2 rounded-xl bg-surface-elevated p-3 gap-1.5">
          <View className="h-3 w-12 rounded bg-surface-border" />
          <View className="h-3.5 w-[85%] rounded bg-surface-border" />
          <View className="h-3.5 w-[60%] rounded bg-surface-border" />
        </View>

        <View className="flex-row justify-between mt-2">
          <View className="h-3 w-16 rounded bg-surface-border" />
        </View>
      </View>
    ))}
  </VStack>
);

const AiTipsHomePage = () => {
  const { aiTipsData, isLoading, isError, error } = useAITips();
  const languageCode = useLanguageStore((state) => state.languageCode);

  const tips = useMemo(() => {
    return aiTipsData?.[languageCode] ?? [];
  }, [aiTipsData, languageCode]);

  if (isLoading) {
    return <AiTipsSkeleton />;
  }

  if (isError) {
    return (
      <VStack className="gap-4">
        <VStack className="mb-2">
          <SectionHeading>AI Tips</SectionHeading>
          <Text className="mt-1 text-sm text-muted-foreground">
            Practical ways to get more from AI
          </Text>
        </VStack>
        <View className="rounded-2xl bg-card border border-red-500/20 p-4 flex-row items-center gap-2">
          <Ionicons name="alert-circle-outline" size={20} color="#f87171" />
          <Text className="text-destructive text-sm font-medium flex-1">
            {error instanceof Error ? error.message : "Failed to load tips"}
          </Text>
        </View>
      </VStack>
    );
  }

  if (!tips.length) {
    return null;
  }

  // Dashboard should only show a few
  const featuredTips = tips.slice(0, 3);

  return (
    <VStack className="gap-4">
      {/* Header */}
      <VStack className="mb-2">
        <SectionHeading>AI Tips</SectionHeading>

        <Text className="mt-1 text-sm text-muted-foreground">
          Practical ways to get more from AI
        </Text>
      </VStack>

      {/* Tips */}
      {featuredTips.map((item) => (
        <TipCard
          key={String(item.id)}
          content={item.content}
          tip={item.tip}
          category={item.category}
          difficulty={item.difficulty}
          platform={item.platform}
          onPress={() =>
            router.push({ pathname: "/tips/[id]", params: { id: String(item.id) } })
          }
        />
      ))}

      {/* View all */}
      <Pressable onPress={() => router.push("/tips")}>
        <Text className="mt-1 text-center text-sm font-semibold text-secondary">
          View all tips →
        </Text>
      </Pressable>
    </VStack>
  );
};

export default AiTipsHomePage;
