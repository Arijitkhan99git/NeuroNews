import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useTechNewsFilterStore } from "@/features/filterModal/filterStore/useTechNewsFilterStore";

import NewsFilterModal from "@/features/filterModal/NewsFilterModal";
import NewsCard from "@/features/news/NewsCard";
import NoResultsFound from "@/features/noResultFound/NoResultFound";
import { useTechNews } from "@/hooks/useTechNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Menu } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewsHeader = ({
  query,
  onChangeQuery,
  setModalVisible,
}: {
  query: string;
  onChangeQuery: (text: string) => void;
  setModalVisible: (visible: boolean) => void;
}) => (
  <VStack>
    <HStack className="justify-between items-center gap-20">
      <VStack className="flex-1">
        <SectionHeading style={{ fontSize: 28, lineHeight: 32 }}>
          AI News
        </SectionHeading>

        <Text className="text-sm text-muted-foreground mt-1">
          Stay informed about the latest developments in AI.
        </Text>
      </VStack>

      <Box className="flex-shrink-0">
        <Pressable onPress={() => setModalVisible(true)}>
          <Menu color="white" size={26} />
        </Pressable>
      </Box>
    </HStack>

    <Box className="mt-6">
      <Input
        isDisabled={false}
        isInvalid={false}
        className="bg-muted border border-border rounded-2xl px-4 py-1 flex-row items-center"
      >
        <InputSlot>
          <InputIcon
            as={SearchIcon}
            className="w-5 h-5 text-muted-foreground"
          />
        </InputSlot>
        <InputField
          placeholder="Search..."
          value={query}
          onChangeText={onChangeQuery}
          className="text-base"
        />
      </Input>
    </Box>
  </VStack>
);

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { techNewsData, isLoading, isError, error } = useTechNews();

  const { setTechNews } = useTechNewsFilterStore();
  const selectedCategories = useTechNewsFilterStore(
    (s) => s.selectedCategories,
  );

  const selectedDifficulties = useTechNewsFilterStore(
    (s) => s.selectedDifficulties,
  );
  const languageCode = useLanguageStore((s) => s.languageCode);

  const newsData = useMemo(
    () => (techNewsData ? techNewsData[languageCode] : []),
    [techNewsData, languageCode],
  );

  useEffect(() => {
    if (newsData.length > 0) {
      setTechNews(newsData);
    }
  }, [newsData, setTechNews]);

  const filterNewsData = newsData.filter((item) => {
    const matchesSearch =
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.impact.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category.trim());

    const matchDifficulties =
      selectedDifficulties.length === 0 ||
      selectedDifficulties.includes(item.impact.trim());

    return matchesSearch && matchesCategory && matchDifficulties;
  });

  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={filterNewsData}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <NewsHeader
              query={searchQuery}
              onChangeQuery={setSearchQuery}
              setModalVisible={setIsModalVisible}
            />
          }
          renderItem={({ item }) => <NewsCard item={item} />}
          ListEmptyComponent={
            <NoResultsFound description="Try to serach or filter something else." />
          }
          contentContainerStyle={{
            paddingBottom: 120,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />

        {isModalVisible && (
          <NewsFilterModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
        )}
      </SafeAreaView>
    </Box>
  );
};

export default News;
