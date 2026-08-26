import { NewsItem } from "@/api/model/techNews-model";
import CustomBadge from "@/components/utils/Badge";

import { Dimensions, Pressable, Text, View } from "react-native";

const CARD_WIDTH = Dimensions.get("window").width * 0.75;

export function ArticleCard({ item }: { item: NewsItem }) {
  return (
    <Pressable
      style={{ width: CARD_WIDTH }}
      className="mr-5 rounded-2xl bg-gray-800 border border-gray-700 overflow-hidden p-4"
    >
      <View className="gap-2">
        <CustomBadge text={item.category} />

        <Text
          numberOfLines={2}
          className="text-gray-200 text-lg font-semibold mb-2"
        >
          {item.content}
        </Text>

        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-gray-300 text-sm">{item.source}</Text>
        </View>
      </View>
    </Pressable>
  );
}
