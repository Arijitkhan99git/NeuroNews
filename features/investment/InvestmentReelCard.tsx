import { FundingItem, SecondaryMarketItem } from "@/api/model/investment-model";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    Dimensions,
    Linking,
    Pressable,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export type InvestmentReelCardProps =
    | { type: "primary"; item: FundingItem; isLast: boolean }
    | { type: "secondary"; item: SecondaryMarketItem; isLast: boolean };

export const InvestmentReelCard = (props: InvestmentReelCardProps) => {
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const iconMuted = isDark ? "#94a3b8" : "#64748b";

    const handleReadMore = async (url?: string) => {
        if (!url) return;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.warn(`Cannot open URL: ${url}`);
        }
    };

    if (props.type === "primary") {
        const { item, isLast } = props;
        return (
            <View
                className="overflow-hidden relative px-5 pb-8"
                style={{ height: SCREEN_HEIGHT, paddingTop: insets.top + 60 }}
            >
                {/* Background glow accent */}
                <View className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-primary-deep/10" />

                <View className="flex-1 gap-4">
                    {/* Header tags: Company & Round category */}
                    <View className="flex-row items-center gap-2 flex-wrap">
                        <View className="rounded-full bg-primary-deep/20 px-3 py-1 border border-primary-deep/30">
                            <Text className="text-xs font-bold text-primary">
                                🏢 {item.company}
                            </Text>
                        </View>
                        {item.roundCategory && item.roundCategory !== "Unknown" && (
                            <View className="rounded-full bg-surface-elevated border border-surface-border px-3 py-1">
                                <Text className="text-xs font-semibold text-foreground">
                                    {item.roundCategory}
                                </Text>
                            </View>
                        )}
                        <View className="ml-auto">
                            <Text className="text-xs text-dim-text">{item.timestamp}</Text>
                        </View>
                    </View>

                    {/* Main Content */}
                    <Text className="text-lg font-bold text-foreground leading-[26px]">
                        {item.content}
                    </Text>

                    {/* Key Details Card */}
                    <View className="rounded-2xl bg-surface border border-surface-border p-4 gap-3">
                        <Text className="text-[11px] font-extrabold text-primary tracking-wider uppercase">
                            📊 Funding Intel
                        </Text>

                        <View className="flex-row flex-wrap gap-x-6 gap-y-3">
                            <View>
                                <Text className="text-xs text-dim-text">Amount</Text>
                                <Text className="text-sm font-bold text-primary">
                                    {item.amount && item.amount !== "N/A"
                                        ? item.amount
                                        : "Undisclosed"}
                                </Text>
                            </View>

                            <View>
                                <Text className="text-xs text-dim-text">Valuation</Text>
                                <Text className="text-sm font-bold text-foreground">
                                    {item.valuation ?? "N/A"}
                                </Text>
                            </View>

                            <View>
                                <Text className="text-xs text-dim-text">Round</Text>
                                <Text className="text-sm font-bold text-foreground">
                                    {item.round ?? "N/A"}
                                </Text>
                            </View>
                        </View>

                        {/* Investors list */}
                        {item.investors && item.investors.length > 0 ? (
                            <View className="pt-2 border-t border-surface-border/60 gap-1.5">
                                <Text className="text-xs text-dim-text font-medium">
                                    Investors:
                                </Text>
                                <View className="flex-row flex-wrap gap-1.5">
                                    {item.investors.map((inv: string, idx: number) => (
                                        <View
                                            key={idx}
                                            className="px-2.5 py-1 rounded-lg bg-surface-elevated border border-surface-border"
                                        >
                                            <Text className="text-xs font-semibold text-foreground">
                                                {inv}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ) : null}

                        {/* Read full article button */}
                        {item.sourceUrl ? (
                            <Pressable
                                onPress={() => handleReadMore(item.sourceUrl)}
                                className="flex-row items-center gap-1.5 mt-1 self-start"
                            >
                                <Text className="text-[13px] font-semibold text-primary">
                                    Read full article
                                </Text>
                                <Text className="text-[13px] text-primary">→</Text>
                            </Pressable>
                        ) : null}
                    </View>

                    {/* Author & Footer metrics */}
                    <View className="flex-row items-center justify-between mt-auto">
                        <View className="flex-row items-center gap-2.5">
                            <View className="w-9 h-9 rounded-full bg-primary-deep/20 border border-primary-deep/30 items-center justify-center">
                                <Text className="text-xs font-bold text-primary">
                                    {item.author?.name?.charAt(0) ?? "A"}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-[13px] font-bold text-foreground">
                                    {item.author?.name ?? "Publisher"}
                                </Text>
                                <Text className="text-xs text-dim-text">
                                    {item.author?.handle ? item.author.handle : "Verified Publisher"}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row gap-3">
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="heart-outline" size={14} color={iconMuted} />
                                <Text className="text-xs text-dim-text">
                                    {item.metrics?.likes ?? 0}
                                </Text>
                            </View>
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="eye-outline" size={14} color={iconMuted} />
                                <Text className="text-xs text-dim-text">
                                    {item.metrics?.views ?? "—"}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Swipe Hint */}
                    {!isLast && (
                        <View className="flex-row items-center justify-center gap-1 pb-2">
                            <Ionicons name="chevron-down-outline" size={16} color={iconMuted} />
                            <Text className="text-[11px] text-muted-foreground/60">
                                Swipe for next card
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    // Secondary Market Reel Details Card
    const { item, isLast } = props;
    const isUp = item.direction === "up";
    const trendColor = isUp ? "#22c55e" : "#ef4444";
    const trendBg = isUp ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)";
    const trendBorder = isUp ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)";

    return (
        <View
            className="overflow-hidden relative px-5 pb-8"
            style={{ height: SCREEN_HEIGHT, paddingTop: insets.top + 60 }}
        >
            {/* Glow accent */}
            <View className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-primary-deep/10" />

            <View className="flex-1 gap-4">
                {/* Header tags: Ticker & Direction */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <View className="px-3 py-1 rounded-xl bg-surface-elevated border border-surface-border">
                            <Text className="text-xs font-extrabold text-foreground tracking-wider">
                                ${item.ticker}
                            </Text>
                        </View>
                        <View
                            className="flex-row items-center gap-1 px-3 py-1 rounded-xl border"
                            style={{ backgroundColor: trendBg, borderColor: trendBorder }}
                        >
                            <Ionicons
                                name={isUp ? "trending-up-outline" : "trending-down-outline"}
                                size={14}
                                color={trendColor}
                            />
                            <Text className="text-xs font-bold capitalize" style={{ color: trendColor }}>
                                {item.direction}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-xs text-dim-text">{item.timestamp}</Text>
                </View>

                {/* Main Content */}
                <Text className="text-lg font-bold text-foreground leading-[26px]">
                    {item.content}
                </Text>

                {/* Details Box */}
                <View className="rounded-2xl bg-surface border border-surface-border p-4 gap-3">
                    <Text className="text-[11px] font-extrabold text-primary tracking-wider uppercase">
                        📈 Market Move Intel
                    </Text>

                    <View className="flex-row flex-wrap gap-x-6 gap-y-3">
                        <View>
                            <Text className="text-xs text-dim-text">Ticker Name</Text>
                            <Text className="text-sm font-bold text-foreground">
                                {item.ticker}
                            </Text>
                        </View>

                        <View>
                            <Text className="text-xs text-dim-text">Price / Move</Text>
                            <Text className="text-sm font-bold" style={{ color: trendColor }}>
                                {item.price && item.price.trim() !== "" ? item.price : item.direction}
                            </Text>
                        </View>

                        <View>
                            <Text className="text-xs text-dim-text">Market Cap</Text>
                            <Text className="text-sm font-bold text-foreground">
                                {item.marketCap ?? "N/A"}
                            </Text>
                        </View>
                    </View>

                    {/* Read full article button */}
                    {item.sourceUrl ? (
                        <Pressable
                            onPress={() => handleReadMore(item.sourceUrl)}
                            className="flex-row items-center gap-1.5 mt-1 self-start"
                        >
                            <Text className="text-[13px] font-semibold text-primary">
                                Read full article
                            </Text>
                            <Text className="text-[13px] text-primary">→</Text>
                        </Pressable>
                    ) : null}
                </View>

                {/* Author & Footer metrics */}
                <View className="flex-row items-center justify-between mt-auto">
                    <View className="flex-row items-center gap-2.5">
                        <View className="w-9 h-9 rounded-full bg-primary-deep/20 border border-primary-deep/30 items-center justify-center">
                            <Text className="text-xs font-bold text-primary">
                                {item.author?.name?.charAt(0) ?? "A"}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-[13px] font-bold text-foreground">
                                {item.author?.name ?? "Publisher"}
                            </Text>
                            <Text className="text-xs text-dim-text">
                                {item.author?.handle ? item.author.handle : "Verified Publisher"}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="heart-outline" size={14} color={iconMuted} />
                            <Text className="text-xs text-dim-text">
                                {item.metrics?.likes ?? 0}
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="eye-outline" size={14} color={iconMuted} />
                            <Text className="text-xs text-dim-text">
                                {item.metrics?.views ?? "—"}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Swipe Hint */}
                {!isLast && (
                    <View className="flex-row items-center justify-center gap-1 pb-2">
                        <Ionicons name="chevron-down-outline" size={16} color={iconMuted} />
                        <Text className="text-[11px] text-muted-foreground/60">
                            Swipe for next card
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};
