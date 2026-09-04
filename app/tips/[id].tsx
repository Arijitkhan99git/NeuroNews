import { AiTipItem } from "@/api/model/tip-model";
import { useAiTipsFilterStore } from "@/features/filterModal/filterStore/useAiTipsFilterStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useMemo, useRef } from "react";
import {
    Dimensions,
    FlatList,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

/* ─── Difficulty colour — semantic status (green/yellow/red), intentionally hardcoded */
const difficultyColor = (d: string) => {
    if (d === "Beginner") return "#4ade80";
    if (d === "Intermediate") return "#facc15";
    return "#f87171";
};

/* ─── Single reel card ───────────────────────────────────── */
const TipReelCard = ({ item, isLast }: { item: AiTipItem; isLast: boolean }) => {
    const handleReadMore = async () => {
        if (!item.sourceUrl) return;
        const supported = await Linking.canOpenURL(item.sourceUrl);
        if (supported) await Linking.openURL(item.sourceUrl);
        else console.warn(`Cannot open URL: ${item.sourceUrl}`);
    };

    const color = difficultyColor(item.difficulty);

    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const iconMuted = isDark ? "#94a3b8" : "#64748b";

    return (
        <View
            className="overflow-hidden relative px-5 pb-8"
            style={{ height: SCREEN_HEIGHT, paddingTop: insets.top + 60 }}
        >
            {/* Glow accent */}
            <View className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-primary-deep/10" />

            <View className="flex-1 gap-4">
                {/* Category + Difficulty */}
                <View className="flex-row items-center gap-2">
                    <View className="rounded-full bg-primary-deep/20 px-3 py-1">
                        <Text className="text-xs font-semibold text-primary">{item.category}</Text>
                    </View>
                    <View
                        className="rounded-full px-3 py-1 border"
                        style={{ borderColor: color }}
                    >
                        <Text className="text-xs font-semibold" style={{ color }}>
                            {item.difficulty}
                        </Text>
                    </View>
                </View>

                {/* Main content */}
                <Text className="text-xl font-bold text-foreground leading-[30px]">
                    {item.content}
                </Text>

                {/* Tip box */}
                <View className="rounded-2xl bg-primary-deep/10 border border-primary-deep/20 p-4 gap-1.5">
                    <Text className="text-[11px] font-extrabold text-primary tracking-[1px]">
                        💡 TIP
                    </Text>
                    <Text className=" text-muted-foreground "
                        style={styles.tipBodyText}
                    >
                        {item.tip}
                    </Text>

                    {/* Read more INSIDE tip box */}
                    <Pressable onPress={handleReadMore} className="flex-row items-center gap-1.5 mt-1.5 self-start">
                        <Text className="text-[13px] font-semibold text-primary">Read full article</Text>
                        <Text className="text-[13px] text-primary">→</Text>
                    </Pressable>
                </View>

                {/* Author + metrics footer */}
                <View className="flex-row items-center justify-between mt-auto">
                    <View className="flex-row items-center gap-2.5">
                        <View className="w-9 h-9 rounded-full bg-primary-deep/25 items-center justify-center">
                            <Text className="text-sm font-bold text-primary">
                                {item.author?.name?.charAt(0) ?? "?"}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-[13px] font-semibold text-foreground">
                                {item.author?.name ?? "Unknown"}
                            </Text>
                            <Text className="text-xs text-dim-text">
                                {item.author?.handle ?? ""}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3.5">
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="heart-outline" size={13} color={iconMuted} />
                            <Text className="text-xs text-muted-foreground">{item.metrics?.likes ?? 0}</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="eye-outline" size={13} color={iconMuted} />
                            <Text className="text-xs text-muted-foreground">{item.metrics?.views ?? "—"}</Text>
                        </View>
                    </View>
                </View>

                {/* Scroll hint */}
                {!isLast && (
                    <View className="flex-row items-center justify-center gap-1 pb-2">
                        <Ionicons name="chevron-down-outline" size={16} color={iconMuted} />
                        <Text className="text-[11px] text-muted-foreground/50">Swipe for next tip</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

/* ─── Screen ─────────────────────────────────────────────── */
const TipDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const tips = useAiTipsFilterStore((s) => s.tips);
    const listRef = useRef<FlatList>(null);
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const iconMuted = isDark ? "#94a3b8" : "#64748b";

    const initialIndex = useMemo(
        () => Math.max(tips?.findIndex((s) => String(s.id) === id) ?? -1, 0),
        [tips, id],
    );

    const getItemLayout = useCallback(
        (_: unknown, index: number) => ({
            length: SCREEN_HEIGHT,
            offset: SCREEN_HEIGHT * index,
            index,
        }),
        [],
    );

    const renderItem = useCallback(
        ({ item, index }: { item: AiTipItem; index: number }) => (
            <TipReelCard item={item} isLast={index === (tips?.length ?? 0) - 1} />
        ),
        [tips?.length],
    );

    if (!tips?.length) return null;

    return (
        <View className="flex-1 bg-background">
            <FlatList
                ref={listRef}
                data={tips}
                keyExtractor={(item) => String(item.id)}
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
            {/* Back button */}
            <Pressable
                onPress={() => router.back()}
                className="absolute left-0 flex-row items-center gap-1.5 px-5 py-2.5 z-10"
                style={{ top: insets.top }}
            >
                <Ionicons name="arrow-back-outline" size={22} color={iconMuted} />
                <Text className=" text-muted-foreground">Tips</Text>
            </Pressable>
        </View>
    );
};

export default TipDetails;


/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backText: { fontSize: 14, color: "#94a3b8" },

    slide: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 32,
        position: "relative",
        overflow: "hidden",
    },
    glowAccent: {
        position: "absolute",
        top: -60,
        right: -60,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "rgba(124,58,237,0.12)",
    },
    slideInner: { flex: 1, gap: 16 },

    badgeRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    categoryBadge: {
        backgroundColor: "rgba(124,58,237,0.18)",
        borderRadius: 100,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    categoryText: { fontSize: 12, fontWeight: "600", color: "#a78bfa" },
    difficultyBadge: {
        borderRadius: 100,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
    },
    difficultyText: { fontSize: 12, fontWeight: "600" },

    contentText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#f1f5f9",
        lineHeight: 30,
    },

    tipBox: {
        backgroundColor: "rgba(124,58,237,0.10)",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(124,58,237,0.20)",
        gap: 6,
    },
    tipLabel: { fontSize: 11, fontWeight: "800", color: "#a78bfa", letterSpacing: 1 },
    tipBodyText: { fontSize: 14, lineHeight: 22 },
    readMoreRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 6,
        alignSelf: "flex-start",
    },
    readMoreText: { fontSize: 13, fontWeight: "600", color: "#a78bfa" },
    readMoreArrow: { fontSize: 13, color: "#a78bfa" },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "auto",
    },
    authorRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    avatarPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(124,58,237,0.25)",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarInitial: { fontSize: 14, fontWeight: "700", color: "#a78bfa" },
    authorName: { fontSize: 13, fontWeight: "600", color: "#e2e8f0" },
    authorHandle: { fontSize: 12, color: "#475569" },
    metricsRow: { flexDirection: "row", gap: 14 },
    metricItem: { flexDirection: "row", alignItems: "center", gap: 4 },
    metricText: { fontSize: 12, color: "#94a3b8" },

    scrollHint: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 4,
        paddingBottom: 8,
    },
    scrollHintText: { fontSize: 11, color: "rgba(148,163,184,0.5)" },
});