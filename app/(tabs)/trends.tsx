import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useTrendingFilterStore } from "@/features/filterModal/filterStore/useTrendingFilterStore";
import TrendingFilterModal from "@/features/filterModal/TrendingFilterModal";
import NoResultsFound from "@/features/noResultFound/NoResultFound";
import TrendingCardList from "@/features/trending/TrendingCardList";
import TrendingCardSkeleton from "@/features/trending/TrendingCardSkeleton";
import { useTrendingNews } from "@/hooks/useTrendingNews";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useColorScheme } from "nativewind";
import { AlertTriangle, Menu, X, SlidersHorizontal } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TrendsHeader = ({
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
          Trending
        </SectionHeading>

        <Text className="text-sm text-muted-foreground mt-1">
          What is gaining attention today.
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
          placeholder="Search trends..."
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
  </VStack>
  );
};

const Trends = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { trendingData, isLoading, isError, error, refetch, isRefetching } = useTrendingNews();

  const { setTrendingNews } = useTrendingFilterStore();
  const selectedCategories = useTrendingFilterStore(
    (s) => s.selectedCategories,
  );
  const activeFilterCount = selectedCategories.length;

  const languageCode = useLanguageStore((s) => s.languageCode);

  const trendsData = useMemo(
    () => (trendingData ? trendingData.trends[languageCode] : []),
    [trendingData, languageCode],
  );

  useEffect(() => {
    if (trendsData.length > 0) {
      setTrendingNews(trendsData);
    }
  }, [trendsData, setTrendingNews]);

  const filteredTrendsData = trendsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.momentum.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category.trim());

    return matchesSearch && matchesCategory;
  });

  const header = (
    <TrendsHeader
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
            data={[1]}
            keyExtractor={() => "loading"}
            ListHeaderComponent={
              <>
                {header}
                <View className="rounded-2xl bg-card border border-border px-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <TrendingCardSkeleton key={i} />
                  ))}
                </View>
              </>
            }
            renderItem={() => null}
            contentContainerStyle={{ paddingBottom: 120 }}
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
            title="Couldn't load trends"
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
          data={[1]}
          keyExtractor={() => "trends-list"}
          ListHeaderComponent={header}
          renderItem={() =>
            filteredTrendsData.length === 0 ? (
              <NoResultsFound description="Try to search or filter something else." />
            ) : (
              <View className="rounded-2xl bg-card border border-border px-4">
                {filteredTrendsData.map((item, index) => (
                  <TrendingCardList
                    key={`${item.title}-${index}`}
                    item={item}
                    index={index}
                  />
                ))}
              </View>
            )
          }
          contentContainerStyle={{
            paddingBottom: 120,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onRefresh={refetch}
          refreshing={isRefetching}
        />

        {isModalVisible && (
          <TrendingFilterModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
        )}
      </SafeAreaView>
    </Box>
  );
};

export default Trends;
