import { NewsItem } from "@/api/model/techNews-model";
import CustomBadge from "@/components/utils/Badge";
import ImpactBadge from "@/components/utils/ImpactBadge";
import { router } from "expo-router";

import { Pressable, Text, View } from "react-native";

const NewsCard = ({ item }: { item: NewsItem }) => {
  function handleNewsRedirect() {
    router.push({
      pathname: "/news/[id]",
      params: { id: item.id },
    });
  }

  return (
    <Pressable
      onPress={handleNewsRedirect}
      className="w-full rounded-2xl bg-card border border-border overflow-hidden p-4"
    >
      <View className="gap-3">
        <CustomBadge text={item.category} />

        <Text numberOfLines={3} className="text-gray-300  mb-2">
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
};

export default NewsCard;
