import { Box } from "@/components/ui/box";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { useAiTipsFilterStore } from "@/features/filterModal/filterStore/useAiTipsFilterStore";
import TipsFilterModal from "@/features/filterModal/TipsFilterModal";
import { useAITips } from "@/hooks/useAITips";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SlidersHorizontal, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ─── Skeleton card ─────────────────────────────────────── */
const TipCardSkeleton = () => (
    <View className="rounded-2xl bg-surface border border-surface-border p-4">
        <View className="flex-row gap-2 items-center">
            <View className="h-5 w-20 rounded-full bg-surface-border" />
            <View className="h-5 w-16 rounded-full bg-surface-border" />
        </View>
        <View className="h-3 w-[90%] rounded-md bg-surface-border mt-3.5" />
        <View className="h-3 w-[70%] rounded-md bg-surface-border mt-2" />
        <View className="mt-3 rounded-xl bg-surface p-3 gap-1.5">
            <View className="h-3 w-[40%] rounded-md bg-surface-border" />
            <View className="h-3 w-[85%] rounded-md bg-surface-border" />
            <View className="h-3 w-[60%] rounded-md bg-surface-border" />
        </View>
        <View className="flex-row justify-between mt-3.5">
            <View className="h-5 w-[70px] rounded-full bg-surface-border" />
            <View className="h-5 w-[80px] rounded-full bg-surface-border" />
        </View>
    </View>
);

/* ─── Tip list card ──────────────────────────────────────── */
const TipListCard = ({
    item,
    onPress,
}: {
    item: import("@/api/model/tip-model").AiTipItem;
    onPress: () => void;
}) => {
    // Difficulty uses semantic status colors (green/yellow/red) — intentionally hardcoded
    const difficultyColor =
        item.difficulty === "Beginner"
            ? "#4ade80"
            : item.difficulty === "Intermediate"
                ? "#facc15"
                : "#f87171";

    const handleReadMore = async () => {
        if (!item.sourceUrl) return;
        const { Linking } = await import("react-native");
        const supported = await Linking.canOpenURL(item.sourceUrl);
        if (supported) await Linking.openURL(item.sourceUrl);
    };

    return (
        <Pressable onPress={onPress} className="rounded-2xl bg-surface border border-surface-border p-4">
            {/* Category + Difficulty */}
            <View className="flex-row items-center gap-2">
                <View className="rounded-full bg-primary-deep/20 px-2.5 py-[3px]">
                    <Text className="text-[11px] font-semibold text-primary">{item.category}</Text>
                </View>
                <View
                    className="rounded-full px-2.5 py-[3px] border"
                    style={{ borderColor: difficultyColor }}
                >
                    <Text className="text-[11px] font-semibold" style={{ color: difficultyColor }}>
                        {item.difficulty}
                    </Text>
                </View>
            </View>

            {/* Content headline */}
            <Text className="mt-3 text-[15px] font-semibold text-foreground leading-snug" numberOfLines={2}>
                {item.content}
            </Text>

            {/* Tip box */}
            <View className="mt-3 rounded-xl bg-primary-deep/10 border border-primary-deep/20 p-3">
                <Text className="text-[11px] font-bold text-primary">💡 TIP</Text>
                <Text className="mt-1 text-muted-foreground" numberOfLines={3}
                    style={styles.tipText}
                >
                    {item.tip}
                </Text>
                {/* Read more INSIDE the tip box */}
                <Pressable onPress={handleReadMore} className="flex-row items-center gap-1 mt-2.5 self-start">
                    <Text className="text-xs font-semibold text-primary">Read more</Text>
                    <Text className="text-xs text-primary">→</Text>
                </Pressable>
            </View>

            {/* Footer */}
            <View className="flex-row items-center justify-between mt-3.5">
                <Text className="text-sm text-dim-text">{item.platform}</Text>
                <View className="flex-row items-center gap-1">
                    <Ionicons name="eye-outline" size={13} color="#94a3b8" />
                    <Text className="text-xs text-dim-text">{item.metrics?.views ?? "—"}</Text>
                </View>
            </View>
        </Pressable>
    );
};

/* ─── Main tips page ─────────────────────────────────────── */
const TipsPage = () => {
    const { aiTipsData, isLoading, isError, error } = useAITips();
    const languageCode = useLanguageStore((s) => s.languageCode);

    const { setTips, selectedCategories, selectedDifficulties } = useAiTipsFilterStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const iconMuted = isDark ? "#94a3b8" : "#64748b";

    const tipsData = useMemo(
        () => (aiTipsData ? (aiTipsData[languageCode] ?? []) : []),
        [aiTipsData, languageCode],
    );

    // Populate the store so [id].tsx can read from it
    useEffect(() => {
        if (tipsData.length > 0) setTips(tipsData);
    }, [tipsData, setTips]);

    const filteredTips = tipsData.filter((item) => {
        const matchesSearch =
            searchQuery.trim() === "" ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tip.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(item.category.trim());

        const matchesDifficulty =
            selectedDifficulties.length === 0 || selectedDifficulties.includes(item.difficulty.trim());

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    const activeFilterCount = selectedCategories.length + selectedDifficulties.length;

    /* ── Header ── */
    const ListHeader = (
        <View className="mb-2 pt-4">
            {/* Back + Title row */}
            <View className="flex-row items-center gap-3 mb-4">
                <Pressable
                    onPress={() => router.back()}
                    className="w-9 h-9 rounded-full bg-surface border border-surface-border items-center justify-center"
                >
                    <Ionicons name="arrow-back-outline" size={20} color={iconMuted} />
                </Pressable>
                <View>
                    <SectionHeading>AI Tips</SectionHeading>
                    <Text className="text-[13px] text-subtle mt-0.5">
                        Practical ways to get more from AI
                    </Text>
                </View>
            </View>

        {/* Search + Filter row */}
        <View className="flex-row gap-2.5 items-center mt-1 mb-4">
            <View className="flex-1 flex-row items-center bg-surface border border-surface-border rounded-2xl px-3 py-1 gap-2">
                <Ionicons name="search-outline" size={16} color={iconMuted} />
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search tips..."
                    placeholderTextColor={iconMuted}
                    className="flex-1 text-[14px] text-foreground"
                />
                {searchQuery.length > 0 && (
                    <Pressable onPress={() => setSearchQuery("")} hitSlop={8}>
                        <X size={15} color={iconMuted} />
                    </Pressable>
                )}
            </View>

                <Pressable
                    onPress={() => setIsModalVisible(true)}
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
        </View>
    );

    /* ── Loading ── */
    if (isLoading) {
        return (
            <Box className="flex-1 bg-background">
                <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
                    <FlatList
                        data={[1, 2, 3]}
                        keyExtractor={(i) => i.toString()}
                        ListHeaderComponent={ListHeader}
                        renderItem={() => <TipCardSkeleton />}
                        contentContainerStyle={{ paddingBottom: 40, gap: 16 }}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            </Box>
        );
    }

    /* ── Error ── */
    if (isError) {
        return (
            <Box className="flex-1 bg-background">
                <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
                    {ListHeader}
                    <View className="items-center justify-center pt-16 gap-2">
                        <Ionicons name="alert-circle-outline" size={40} color="#f87171" />
                        <Text className="text-destructive text-sm text-center">
                            {error instanceof Error ? error.message : "Failed to load tips"}
                        </Text>
                    </View>
                </SafeAreaView>
            </Box>
        );
    }

    /* ── Main ── */
    return (
        <Box className="flex-1 bg-background">
            <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
                <FlatList
                    data={filteredTips}
                    keyExtractor={(item) => String(item.id)}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item }) => (
                        <TipListCard
                            item={item}
                            onPress={() =>
                                router.push({ pathname: "/tips/[id]", params: { id: item.id } })
                            }
                        />
                    )}
                    ListEmptyComponent={
                        <View className="items-center justify-center pt-16 gap-2">
                            <Text className="text-base font-semibold text-muted-foreground">No tips found.</Text>
                            <Text className="text-sm text-dim-text">Try adjusting search or filters.</Text>
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                />

                {isModalVisible && (
                    <TipsFilterModal
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                    />
                )}
            </SafeAreaView>
        </Box>
    );
};

export default TipsPage;

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
    headerContainer: { marginBottom: 8, paddingTop: 8 },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.06)",
        alignItems: "center",
        justifyContent: "center",
    },
    subtitle: { fontSize: 13, color: "#64748b", marginTop: 2 },

    searchRow: { flexDirection: "row", gap: 10, alignItems: "center" },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    searchInput: { flex: 1, fontSize: 14, color: "#e2e8f0" },
    filterBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 4,
    },
    filterBtnActive: { backgroundColor: "#7c3aed", borderColor: "#7c3aed" },
    filterCount: { fontSize: 12, color: "#fff", fontWeight: "700" },

    /* Card */
    card: {
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.07)",
    },
    cardTopRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    categoryBadge: {
        backgroundColor: "rgba(124,58,237,0.18)",
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    categoryText: { fontSize: 11, fontWeight: "600", color: "#a78bfa" },
    difficultyBadge: {
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 1,
    },
    difficultyText: { fontSize: 11, fontWeight: "600" },
    cardContent: {
        marginTop: 12,
        fontSize: 15,
        fontWeight: "600",
        color: "#f1f5f9",
        lineHeight: 22,
    },
    tipBox: {
        marginTop: 12,
        backgroundColor: "rgba(124,58,237,0.10)",
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: "rgba(124,58,237,0.18)",
    },
    tipLabel: { fontSize: 11, fontWeight: "700", color: "#a78bfa" },
    tipText: { marginTop: 5, fontSize: 13, lineHeight: 19 },
    readMoreRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 10,
        alignSelf: "flex-start",
    },
    readMoreText: { fontSize: 12, fontWeight: "600", color: "#a78bfa" },
    readMoreArrow: { fontSize: 12, color: "#a78bfa" },
    cardFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 14,
    },
    platformText: { fontSize: 12, color: "#475569" },
    footerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
    viewsText: { fontSize: 12, color: "#475569" },

    /* Skeleton */
    skeletonRow: { flexDirection: "row", gap: 8, alignItems: "center" },
    skeletonPill: {
        height: 20,
        borderRadius: 100,
        backgroundColor: "rgba(255,255,255,0.06)",
    },
    skeletonLine: {
        height: 12,
        borderRadius: 6,
        backgroundColor: "rgba(255,255,255,0.06)",
    },
    skeletonTipBox: {
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 14,
        padding: 12,
    },

    /* States */
    centerMessage: { alignItems: "center", justifyContent: "center", paddingTop: 60, gap: 8 },
    errorText: { color: "#f87171", fontSize: 14, textAlign: "center" },
    emptyText: { color: "#94a3b8", fontSize: 16, fontWeight: "600" },
    emptySubText: { color: "#475569", fontSize: 13 },
});