import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useTechNews } from "@/hooks/useTechNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import { router } from "expo-router";
import { ArrowRight, View } from "lucide-react-native";
import React, { useState } from "react";
import { Dimensions, FlatList, Pressable, Text } from "react-native";
import { ArticleCard } from "./ArticleCard";
import ArticleCardSkeleton from "./ArticleCardSkeleton";
import ArticleDetailModal from "./ArticleDetailModal";
import { ListFooterComponent } from "./FooterComponent";

const TopStories = () => {
  const { techNewsData, isLoading, isError, error } = useTechNews();
  const languageCode = useLanguageStore((s) => s.languageCode);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Modal state
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const newsData = techNewsData ? techNewsData[languageCode] : [];
  const limitedNewsData = newsData.slice(0, 6);

  const CARD_WIDTH = Dimensions.get("window").width * 0.75;
  const GAP = 12;

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isNearEnd =
      contentOffset.x + layoutMeasurement.width >= contentSize.width - 50;
    setIsAtEnd(isNearEnd);
  };

  return (
    <VStack>
      <HStack className="justify-between items-center mb-5">
        <SectionHeading>Top Stories</SectionHeading>

        {!isAtEnd && (
          <Pressable
            className="flex flex-row gap-1"
            onPress={() => router.push("/news")}
          >
            <Text className="text-muted text-sm">View All</Text>
            <ArrowRight color="#b9a0f8cc" size={20} />
          </Pressable>
        )}
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
      ) : limitedNewsData.length === 0 ? (
        <View className="h-40 items-center justify-center">
          <Text className="text-muted-foreground text-sm">
            No stories available right now.
          </Text>
        </View>
      ) : (
        <FlatList
          data={limitedNewsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <ArticleCard
              item={item}
              onPress={() => setModalIndex(index)}
            />
          )}
          ListFooterComponent={<ListFooterComponent />}
          snapToInterval={CARD_WIDTH + GAP}
          decelerationRate="fast"
          snapToAlignment="start"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      )}

      {/* Swipeable detail modal — scoped to limitedNewsData only */}
      {modalIndex !== null && (
        <ArticleDetailModal
          visible={modalIndex !== null}
          items={limitedNewsData}
          initialIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </VStack>
  );
};

export default TopStories;
