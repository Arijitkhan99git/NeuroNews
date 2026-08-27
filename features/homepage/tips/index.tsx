import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useLanguageStore } from "@/store/useLanguageStore";

import React, { useMemo } from "react";

import { SectionHeading } from "@/components/utils/SectionHeading";
import { useAITips } from "@/hooks/useAITips";
import TipCard from "./TipCard";

const AiTipsHomePage = () => {
  const { aiTipsData, isLoading, isError, error } = useAITips();

  const languageCode = useLanguageStore((state) => state.languageCode);

  const tips = useMemo(() => {
    return aiTipsData?.[languageCode] ?? [];
  }, [aiTipsData, languageCode]);

  if (isLoading) {
    return <Text>Loading tips...</Text>;
  }

  if (isError) {
    return (
      <Text className="text-red-400">
        {error instanceof Error ? error.message : "Failed to load tips"}
      </Text>
    );
  }

  if (!tips.length) {
    return <Text className="text-muted-foreground">No tips available.</Text>;
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
          key={item.id}
          content={item.content}
          tip={item.tip}
          category={item.category}
          difficulty={item.difficulty}
          platform={item.platform}
        />
      ))}

      {/* View all */}
      <Text className="mt-1 text-center text-sm font-semibold text-cyan-400">
        View all tips →
      </Text>
    </VStack>
  );
};

export default AiTipsHomePage;
