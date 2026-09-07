import { FundingItem, SecondaryMarketItem } from "@/api/model/investment-model";
import { InvestmentReelCard } from "@/features/investment/InvestmentReelCard";
import { useInvestmentNews } from "@/hooks/useInvestmentNews";
import { MarketTab, useInvestmentStore } from "@/store/useInvestmentStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useMemo, useRef } from "react";
import {
    Dimensions,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const InvestmentDetailsSkeleton = () => {
    const insets = useSafeAreaInsets();
    return (
        <View
            className="overflow-hidden relative px-5 pb-8 flex-1 bg-background"
            style={{ paddingTop: insets.top + 60 }}
        >
            <View className="flex-1 gap-4">
                <View className="flex-row items-center gap-2">
                    <View className="h-6 w-28 rounded-full bg-surface-border" />
                    <View className="h-6 w-20 rounded-full bg-surface-border" />
                </View>

                <View className="gap-2 mt-1">
                    <View className="h-5 w-[92%] rounded-md bg-surface-border" />
                    <View className="h-5 w-[75%] rounded-md bg-surface-border" />
                </View>

                <View className="rounded-2xl bg-surface border border-surface-border p-4 gap-3 mt-2">
                    <View className="h-3.5 w-28 rounded bg-surface-border" />
                    <View className="h-4 w-[95%] rounded bg-surface-border mt-1" />
                    <View className="h-4 w-[85%] rounded bg-surface-border" />
                    <View className="h-4 w-32 rounded bg-surface-border mt-2" />
                </View>

                <View className="flex-row items-center justify-between mt-auto">
                    <View className="flex-row items-center gap-2.5">
                        <View className="w-9 h-9 rounded-full bg-surface-border" />
                        <View className="h-4 w-24 rounded bg-surface-border" />
                    </View>
                    <View className="flex-row gap-3">
                        <View className="h-4 w-12 rounded bg-surface-border" />
                        <View className="h-4 w-12 rounded bg-surface-border" />
                    </View>
                </View>
            </View>
        </View>
    );
};

const InvestmentDetails = () => {
    const { id, type } = useLocalSearchParams<{ id: string; type?: MarketTab }>();
    const marketType: MarketTab = type === "secondary" ? "secondary" : "primary";

    const storePrimary = useInvestmentStore((s) => s.primaryItems);
    const storeSecondary = useInvestmentStore((s) => s.secondaryItems);

    const { investmentData, isLoading } = useInvestmentNews();
    const languageCode = useLanguageStore((s) => s.languageCode);

    const listRef = useRef<FlatList>(null);
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const iconMuted = isDark ? "#94a3b8" : "#64748b";

    // Resolve list of items based on type
    const items = useMemo(() => {
        if (marketType === "secondary") {
            if (storeSecondary && storeSecondary.length > 0) return storeSecondary;
            return investmentData?.secondaryMarket?.[languageCode] ?? [];
        }
        if (storePrimary && storePrimary.length > 0) return storePrimary;
        return investmentData?.primaryMarket?.[languageCode] ?? [];
    }, [marketType, storePrimary, storeSecondary, investmentData, languageCode]);

    const initialIndex = useMemo(
        () => Math.max(items.findIndex((s) => String(s.id) === id), 0),
        [items, id]
    );

    const getItemLayout = useCallback(
        (_: unknown, index: number) => ({
            length: SCREEN_HEIGHT,
            offset: SCREEN_HEIGHT * index,
            index,
        }),
        []
    );

    const renderItem = useCallback(
        ({ item, index }: { item: FundingItem | SecondaryMarketItem; index: number }) => {
            const isLast = index === items.length - 1;
            if (marketType === "secondary") {
                return (
                    <InvestmentReelCard
                        type="secondary"
                        item={item as SecondaryMarketItem}
                        isLast={isLast}
                    />
                );
            }
            return (
                <InvestmentReelCard
                    type="primary"
                    item={item as FundingItem}
                    isLast={isLast}
                />
            );
        },
        [items.length, marketType]
    );

    if (isLoading && items.length === 0) {
        return (
            <View className="flex-1 bg-background">
                <InvestmentDetailsSkeleton />
                <Pressable
                    onPress={() => router.back()}
                    className="absolute left-0 flex-row items-center gap-1.5 px-5 py-2.5 z-10"
                    style={{ top: insets.top }}
                >
                    <Ionicons name="arrow-back-outline" size={22} color={iconMuted} />
                    <Text className="text-muted-foreground font-semibold">Investment</Text>
                </Pressable>
            </View>
        );
    }

    if (items.length === 0) {
        return (
            <View className="flex-1 bg-background items-center justify-center p-6 gap-3">
                <Pressable
                    onPress={() => router.back()}
                    className="absolute left-0 flex-row items-center gap-1.5 px-5 py-2.5 z-10"
                    style={{ top: insets.top }}
                >
                    <Ionicons name="arrow-back-outline" size={22} color={iconMuted} />
                    <Text className="text-muted-foreground font-semibold">Investment</Text>
                </Pressable>
                <Ionicons name="newspaper-outline" size={44} color={iconMuted} />
                <Text className="text-foreground text-base font-bold">
                    No investment news details found.
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <FlatList
                ref={listRef}
                data={items}
                keyExtractor={(item) => `${marketType}-${item.id}`}
                renderItem={renderItem}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                initialScrollIndex={initialIndex}
                getItemLayout={getItemLayout}
                decelerationRate="fast"
                snapToInterval={SCREEN_HEIGHT}
                snapToAlignment="start"
                windowSize={3}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
                removeClippedSubviews
            />

            {/* Floating Back button */}
            <Pressable
                onPress={() => router.back()}
                className="absolute left-0 flex-row items-center gap-1.5 px-5 py-2.5 z-10"
                style={{ top: insets.top }}
            >
                <Ionicons name="arrow-back-outline" size={22} color={iconMuted} />
                <Text className="text-muted-foreground font-semibold">Investment</Text>
            </Pressable>
        </View>
    );
};

export default InvestmentDetails;
