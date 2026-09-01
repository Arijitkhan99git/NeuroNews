import { Box } from "@/components/ui/box";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import NewsCard from "@/features/news/NewsCard";
import { useTechNews } from "@/hooks/useTechNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import React, { useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewsHeader = ({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (text: string) => void;
}) => (
  <VStack>
    <VStack>
      <SectionHeading style={{ fontSize: 28, lineHeight: 32 }}>
        AI News
      </SectionHeading>

      <Text className="text-sm text-muted-foreground mt-1">
        Stay informed about the latest developments in AI.
      </Text>
    </VStack>

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
  const [query, setQuery] = useState("");

  const { techNewsData, isLoading, isError, error } = useTechNews();
  const languageCode = useLanguageStore((s) => s.languageCode);

  const newsData = techNewsData ? techNewsData[languageCode] : [];

  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <NewsHeader query={query} onChangeQuery={setQuery} />
          }
          renderItem={({ item }) => <NewsCard item={item} />}
          contentContainerStyle={{
            paddingBottom: 120,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </SafeAreaView>
    </Box>
  );
};

export default News;
