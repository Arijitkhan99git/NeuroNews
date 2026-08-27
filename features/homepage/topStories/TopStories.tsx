import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useTechNews } from "@/hooks/useTechNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import { ArrowRight, View } from "lucide-react-native";
import React from "react";
import { Dimensions, FlatList, Pressable, Text } from "react-native";
import { ArticleCard } from "./ArticleCard";
import ArticleCardSkeleton from "./ArticleCardSkeleton";

const TopStories = () => {
  const { techNewsData, isLoading, isError, error } = useTechNews();
  const languageCode = useLanguageStore((s) => s.languageCode);

  const newsData = techNewsData ? techNewsData[languageCode] : [];

  const CARD_WIDTH = Dimensions.get("window").width * 0.75;

  return (
    <VStack>
      <HStack className="justify-between items-center mb-5">
        <SectionHeading>Top Stories</SectionHeading>

        <Pressable className="flex flex-row gap-1">
          <Text className=" text-muted text-sm">View All</Text>
          <ArrowRight color="#b9a0f8cc" size={20} />
        </Pressable>
      </HStack>

      {isLoading ? (
        <FlatList
          data={[1, 2, 3]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <ArticleCardSkeleton />}
        />
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
