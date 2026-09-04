import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useTechNewsFilterStore } from "@/features/filterModal/filterStore/useTechNewsFilterStore";
import NewsFilterModal from "@/features/filterModal/NewsFilterModal";
import NewsCard from "@/features/news/NewsCard";
import NewsCardSkeleton from "@/features/news/NewsCardSkeleton";
import NoResultsFound from "@/features/noResultFound/NoResultFound";
import { useTechNews } from "@/hooks/useTechNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import { AlertTriangle, SlidersHorizontal, X } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewsHeader = ({
  query,
  onChangeQuery,
  setModalVisible,
  activeFilterCount,
}: {
  query: string;
  onChangeQuery: (text: string) => void;
  setModalVisible: (visible: boolean) => void;
  activeFilterCount: number;
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconMuted = isDark ? "#94a3b8" : "#64748b";

  return (
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
    </HStack>

    {/* Search + Filter row */}
    <View className="flex-row gap-2.5 items-center mt-6 mb-6">
      <View className="flex-1 flex-row items-center bg-surface border border-surface-border rounded-2xl px-3 py-1 gap-2">
        <Ionicons name="search-outline" size={16} color={iconMuted} />
        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          placeholder="Search news..."
          placeholderTextColor={iconMuted}
          className="flex-1 text-[14px] text-foreground"
        />
        {query.length > 0 && (
          <Pressable onPress={() => onChangeQuery("")} hitSlop={8}>
            <X size={15} color={iconMuted} />
          </Pressable>
        )}
      </View>

      <Pressable
        onPress={() => setModalVisible(true)}
        className={`w-11 h-11 rounded-2xl border items-center justify-center flex-row gap-1 ${activeFilterCount > 0
          ? "bg-primary-deep border-primary-deep"
          : "bg-surface border-surface-border"
          }`}
      >
        <SlidersHorizontal size={18} color={activeFilterCount > 0 ? "#fff" : iconMuted} />
        {activeFilterCount > 0 && (
          <Text className="text-xs text-white font-bold">{activeFilterCount}</Text>
        )}
      </Pressable>
    </View>

    <HStack className="flex-row gap-3 items-center mb-5">
      <View className="bg-muted border border-border rounded-2xl px-4 py-2" style={styles.capsuleShadow}>
        <Text className="text-sm font-bold text-foreground">Tech News</Text>
      </View>
      <View className="bg-card border border-muted rounded-2xl px-4 py-2" >
        <Text className="text-sm font-bold text-foreground">Market Moves</Text>
      </View>
      <Pressable onPress={() => router.push("/tips")}>
        <View className="bg-card border border-muted rounded-2xl px-4 py-2">
          <Text className="text-sm font-bold text-foreground">Tips</Text>
        </View>
      </Pressable>
    </HStack>
  </VStack>
  );
};

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { techNewsData, isLoading, isError, error, refetch, isRefetching } =
    useTechNews();

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

  const activeFilterCount = selectedCategories.length + selectedDifficulties.length;


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

  const header = (
    <NewsHeader
      query={searchQuery}
      onChangeQuery={setSearchQuery}
      setModalVisible={setIsModalVisible}
      activeFilterCount={activeFilterCount}
    />
  );

  // Loading state — show header + skeleton cards, keeps layout stable while fetching
  if (isLoading) {
    return (
      <Box className="flex-1 bg-background">
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={(item) => item.toString()}
            ListHeaderComponent={header}
            renderItem={() => <NewsCardSkeleton />}
            contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Box>
    );
  }

  // Error state — distinct from "no results after filtering"
  if (isError) {
    return (
      <Box className="flex-1 bg-background">
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          {header}
          <NoResultsFound
            icon={AlertTriangle}
            title="Couldn't load news"
            description={
              error?.message ?? "Something went wrong. Pull down to retry."
            }
          />
        </SafeAreaView>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={filterNewsData}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={header}
          renderItem={({ item }) => <NewsCard item={item} />}
          ListEmptyComponent={
            <NoResultsFound description="Try to search or filter something else." />
          }
          onRefresh={refetch}
          refreshing={isRefetching}
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

const styles = StyleSheet.create({
  capsuleShadow: {
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
});
