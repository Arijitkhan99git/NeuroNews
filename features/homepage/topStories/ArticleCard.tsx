import { NewsItem } from "@/api/model/techNews-model";
import CustomBadge from "@/components/utils/Badge";
import ImpactBadge from "@/components/utils/ImpactBadge";

import { Dimensions, Pressable, Text, View } from "react-native";

const CARD_WIDTH = Dimensions.get("window").width * 0.75;

interface ArticleCardProps {
  item: NewsItem;
  onPress: () => void;
}

export function ArticleCard({ item, onPress }: ArticleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: CARD_WIDTH }}
      className="mr-5 rounded-2xl bg-card border border-border overflow-hidden p-4"
    >
      <View className="gap-3">
        <CustomBadge text={item.category} />

        <Text
          numberOfLines={2}
          className="text-gray-300 text-lg font-medium mb-2"
        >
          {item.content}
        </Text>

        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-gray-400 text-sm">{item.source}</Text>

          <View>
            <ImpactBadge impact={item.impact} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
