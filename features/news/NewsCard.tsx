import { NewsItem } from "@/api/model/techNews-model";
import CustomBadge from "@/components/utils/Badge";
import ImpactBadge from "@/components/utils/ImpactBadge";
import { ArrowRight } from "lucide-react-native";

import { Linking, Pressable, Text, View } from "react-native";

const NewsCard = ({ item }: { item: NewsItem }) => {
  const handlePress = async () => {
    if (!item.sourceUrl) return;

    const supported = await Linking.canOpenURL(item.sourceUrl);

    if (supported) {
      await Linking.openURL(item.sourceUrl);
    } else {
      console.warn(`Cannot open URL: ${item.sourceUrl}`);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
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

        <View className="flex-row justify-end items-center gap-1 mt-2">
          <Text className="text-muted text-xs">Read more</Text>
          <ArrowRight color="#b9a0f8cc" size={14} />
        </View>
      </View>
    </Pressable>
  );
};

export default NewsCard;
