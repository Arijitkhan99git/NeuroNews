import { FundingItem, SecondaryMarketItem } from "@/api/model/investment-model";
import { Box } from "@/components/ui/box";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { InvestmentCard } from "@/features/investment/InvestmentCard";
import { useInvestmentNews } from "@/hooks/useInvestmentNews";
import { useInvestmentStore } from "@/store/useInvestmentStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InvestmentCardSkeleton = () => (
  <View className="rounded-2xl bg-surface border border-surface-border p-4 gap-3">
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 rounded-full bg-surface-border" />
        <View className="h-4 w-24 rounded bg-surface-border" />
      </View>
      <View className="h-3 w-16 rounded bg-surface-border" />
    </View>
    <View className="h-3.5 w-[92%] rounded bg-surface-border mt-1" />
    <View className="h-3.5 w-[70%] rounded bg-surface-border" />
    <View className="flex-row justify-between pt-2 border-t border-surface-border/50">
      <View className="h-6 w-24 rounded-xl bg-surface-border" />
      <View className="h-6 w-24 rounded-xl bg-surface-border" />
    </View>
  </View>
);

const InvestmentPage = () => {
  const { investmentData, isLoading, isError, error } = useInvestmentNews();
  const languageCode = useLanguageStore((s) => s.languageCode);

  const {
    activeTab,
    setActiveTab,
    setPrimaryItems,
    setSecondaryItems,
  } = useInvestmentStore();

  const [searchQuery, setSearchQuery] = useState("");
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconMuted = isDark ? "#94a3b8" : "#64748b";

  // Extract localized feeds
  const primaryList: FundingItem[] = useMemo(
    () => (investmentData?.primaryMarket ? investmentData.primaryMarket[languageCode] ?? [] : []),
    [investmentData, languageCode]
  );

  const secondaryList: SecondaryMarketItem[] = useMemo(
    () => (investmentData?.secondaryMarket ? investmentData.secondaryMarket[languageCode] ?? [] : []),
    [investmentData, languageCode]
  );

  // Sync with store for detail page swipe navigation
  useEffect(() => {
    setPrimaryItems(primaryList);
    setSecondaryItems(secondaryList);
  }, [primaryList, secondaryList, setPrimaryItems, setSecondaryItems]);

  // Filter list based on search query
  const filteredPrimary = useMemo(() => {
    if (!searchQuery.trim()) return primaryList;
    const q = searchQuery.toLowerCase();
    return primaryList.filter(
      (item) =>
        item.content.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        (item.author?.name && item.author.name.toLowerCase().includes(q)) ||
        (item.round && item.round.toLowerCase().includes(q))
    );
  }, [primaryList, searchQuery]);

  const filteredSecondary = useMemo(() => {
    if (!searchQuery.trim()) return secondaryList;
    const q = searchQuery.toLowerCase();
    return secondaryList.filter(
      (item) =>
        item.content.toLowerCase().includes(q) ||
        item.ticker.toLowerCase().includes(q) ||
        (item.author?.name && item.author.name.toLowerCase().includes(q))
    );
  }, [secondaryList, searchQuery]);

  /* ── Header ── */
  const ListHeader = (
    <View className="mb-2 pt-4">
      {/* Back button + Section title */}
      <View className="flex-row items-center gap-3 mb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-surface border border-surface-border items-center justify-center"
        >
          <Ionicons name="arrow-back-outline" size={20} color={iconMuted} />
        </Pressable>
        <View>
          <SectionHeading style={{ fontSize: 26, lineHeight: 30 }}>
            Investment News
          </SectionHeading>
          <Text className="text-[13px] text-muted-foreground mt-0.5">
            Primary & secondary market intelligence
          </Text>
        </View>
      </View>

      {/* Top Search bar */}
      <View className="flex-row gap-2.5 items-center mt-1 mb-4">
        <View className="flex-1 flex-row items-center bg-card border border-surface-border rounded-2xl px-3 py-2 gap-2">
          <Ionicons name="search-outline" size={18} color={iconMuted} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search investment news..."
            placeholderTextColor={iconMuted}
            className="flex-1 text-[14px] text-foreground "
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")} hitSlop={8}>
              <X size={16} color={iconMuted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* 2 Market Tabs: Primary vs Secondary */}
      <View className="flex-row bg-surface border border-surface-border rounded-2xl p-1 mb-4">
        <Pressable
          onPress={() => setActiveTab("primary")}
          className={`flex-1 py-2.5 rounded-xl items-center justify-center flex-row gap-1.5 ${activeTab === "primary"
            ? "bg-primary-deep"
            : "bg-transparent"
            }`}
        >
          <Text
            className={`text-xs font-bold ${activeTab === "primary" ? "text-white" : "text-muted-foreground"
              }`}
          >
            Primary Market
          </Text>
          <View
            className={`px-1.5 py-0.5 rounded-md ${activeTab === "primary"
              ? "bg-white/20"
              : "bg-surface-elevated"
              }`}
          >
            <Text
              className={`text-[10px] font-bold ${activeTab === "primary" ? "text-white" : "text-dim-text"
                }`}
            >
              {filteredPrimary.length}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("secondary")}
          className={`flex-1 py-2.5 rounded-xl items-center justify-center flex-row gap-1.5 ${activeTab === "secondary"
            ? "bg-primary-deep"
            : "bg-transparent"
            }`}
        >
          <Text
            className={`text-xs font-bold ${activeTab === "secondary" ? "text-white" : "text-muted-foreground"
              }`}
          >
            Secondary Market
          </Text>
          <View
            className={`px-1.5 py-0.5 rounded-md ${activeTab === "secondary"
              ? "bg-white/20"
              : "bg-surface-elevated"
              }`}
          >
            <Text
              className={`text-[10px] font-bold ${activeTab === "secondary" ? "text-white" : "text-dim-text"
                }`}
            >
              {filteredSecondary.length}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );

  /* Loading State */
  if (isLoading) {
    return (
      <Box className="flex-1 bg-background">
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={(i) => i.toString()}
            ListHeaderComponent={ListHeader}
            renderItem={() => <InvestmentCardSkeleton />}
            contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Box>
    );
  }

  /* Error State */
  if (isError) {
    return (
      <Box className="flex-1 bg-background">
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
          {ListHeader}
          <View className="items-center justify-center pt-16 gap-2">
            <Ionicons name="alert-circle-outline" size={40} color="#f87171" />
            <Text className="text-destructive text-sm text-center font-medium">
              {error instanceof Error
                ? error.message
                : "Failed to load investment news"}
            </Text>
          </View>
        </SafeAreaView>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        {activeTab === "primary" ? (
          <FlatList
            data={filteredPrimary}
            keyExtractor={(item) => `primary-${item.id}`}
            ListHeaderComponent={ListHeader}
            renderItem={({ item }) => (
              <InvestmentCard
                type="primary"
                item={item}
                onPress={() =>
                  router.push({
                    pathname: "/investment/[id]",
                    params: { id: String(item.id), type: "primary" },
                  })
                }
              />
            )}
            ListEmptyComponent={
              <View className="items-center justify-center pt-16 gap-2">
                <Text className="text-base font-semibold text-muted-foreground">
                  No primary market news found.
                </Text>
                <Text className="text-sm text-dim-text">
                  Try adjusting your search query.
                </Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          />
        ) : (
          <FlatList
            data={filteredSecondary}
            keyExtractor={(item) => `secondary-${item.id}`}
            ListHeaderComponent={ListHeader}
            renderItem={({ item }) => (
              <InvestmentCard
                type="secondary"
                item={item}
                onPress={() =>
                  router.push({
                    pathname: "/investment/[id]",
                    params: { id: String(item.id), type: "secondary" },
                  })
                }
              />
            )}
            ListEmptyComponent={
              <View className="items-center justify-center pt-16 gap-2">
                <Text className="text-base font-semibold text-muted-foreground">
                  No secondary market news found.
                </Text>
                <Text className="text-sm text-dim-text">
                  Try adjusting your search query.
                </Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          />
        )}
      </SafeAreaView>
    </Box>
  );
};

export default InvestmentPage;
