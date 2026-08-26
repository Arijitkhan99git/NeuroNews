import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import SectionHeading from "@/components/utils/SectionHeading";
import { useTechNews } from "@/hooks/useTechNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import { ArrowRight, View } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import { ArticleCard } from "./ArticleCard";

const TopStories = () => {
  const { techNewsData, isLoading, isError, error } = useTechNews();
  const languageCode = useLanguageStore((s) => s.languageCode);

  const newsData = techNewsData ? techNewsData[languageCode] : [];

  const CARD_WIDTH = Dimensions.get("window").width * 0.75;
  return (
    <VStack>
      <HStack className="justify-between items-center mb-4">
        <SectionHeading
          text="Top Stories"
          style="text-2xl font-semibold text-heading"
        />

        <Pressable className="flex flex-row gap-1">
          <Text className=" text-heading text-sm">View All</Text>
          <ArrowRight color="#D1D5DB" size={20} />
        </Pressable>
      </HStack>

      {isLoading ? (
        <View className="h-40 w-full items-center justify-center">
          <ActivityIndicator size="small" color="#4F46E5" />
        </View>
      ) : isError ? (
        <View className="h-40 items-center justify-center px-4">
          <Text className="text-muted-foreground text-sm text-center">
            Could load top stories.
          </Text>
          {error ? (
            <Text className="text-muted-foreground text-xs mt-1 text-center">
              {error.message}
            </Text>
          ) : null}
        </View>
      ) : newsData.length === 0 ? (
        <View className="h-40 items-center justify-center">
          <Text className="text-muted-foreground text-sm">
            No stories available right now.
          </Text>
        </View>
      ) : (
        <FlatList
          data={newsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ArticleCard item={item} />}
          //   contentContainerStyle={{ paddingHorizontal: 4 }}
          snapToInterval={CARD_WIDTH + 12}
          decelerationRate="fast"
          snapToAlignment="start"
        />
      )}
    </VStack>
  );
};

export default TopStories;
