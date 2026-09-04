import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import React from "react";
import { Linking, Pressable } from "react-native";

interface TipCardProps {
  content: string;
  tip: string;
  category: string;
  difficulty: string;
  platform: string;
  onPress?: () => void;
  sourceUrl: string;
}

const TipCard = ({
  content,
  tip,
  category,
  difficulty,
  platform,
  sourceUrl
}: TipCardProps) => {
  const handleArticleUrl = async () => {
    if (!sourceUrl) return;

    const supported = await Linking.canOpenURL(sourceUrl);

    if (supported) {
      await Linking.openURL(sourceUrl);
    } else {
      console.warn(`Cannot open URL: ${sourceUrl}`);
    }
  };

  return (
    <Box className="rounded-2xl bg-card p-4">
      {/* Category + Difficulty */}
      <HStack className="items-center justify-between">
        <Box className="rounded-full bg-accent px-3 py-1">
          <Text className="text-xs font-medium text-accent-foreground">
            {category}
          </Text>
        </Box>

        <Text className="text-xs text-muted-foreground">{difficulty}</Text>
      </HStack>

      {/* Content */}
      <Text
        className="mt-4 text-base font-semibold leading-6 text-foreground"
        numberOfLines={2}
      >
        {content}
      </Text>

      {/* Tip */}
      <Box className="mt-3 rounded-xl bg-muted/50 p-3">
        <Text className="text-xs font-semibold text-accent-foreground">
          💡 TIP
        </Text>

        <Text
          className="mt-1 text-sm leading-5 text-muted-foreground"
          numberOfLines={3}
        >
          {tip}
        </Text>
      </Box>

      {/* Source */}
      <HStack className="mt-4 items-center justify-between">
        <Text className="text-xs text-muted-foreground">{platform}</Text>

        <Pressable onPress={handleArticleUrl}>
          <Text className="text-xs font-medium text-accent-foreground">
            Read more →
          </Text>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default TipCard;
