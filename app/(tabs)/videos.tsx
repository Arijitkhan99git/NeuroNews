import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { SectionHeading } from "@/components/utils/SectionHeading";
import NoResultsFound from "@/features/noResultFound/NoResultFound";
import VideoCard from "@/features/videos/VideoCard";
import {
  VideoCardCompactSkeleton,
  VideoCardFeaturedSkeleton,
} from "@/features/videos/VideoCardSkeleton";
import { useVideos } from "@/hooks/useVideos";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Ionicons } from "@expo/vector-icons";
import { AlertTriangle, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Header ───────────────────────────────────────────────────────────────────
const VideosHeader = ({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (text: string) => void;
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconMuted = isDark ? "#94a3b8" : "#64748b";

  return (
    <VStack>
      <HStack className="justify-between items-center gap-20">
        <VStack className="flex-1">
          <SectionHeading style={{ fontSize: 28, lineHeight: 32 }}>
            AI Digest
          </SectionHeading>
          <Text className="text-sm text-muted-foreground mt-1">
            Curated AI videos from top creators.
          </Text>
        </VStack>
      </HStack>

      {/* Search row */}
      <View className="flex-row gap-2.5 items-center mt-6 mb-6">
        <View className="flex-1 flex-row items-center bg-card border border-surface-border rounded-2xl px-3 py-1 gap-2">
          <Ionicons name="search-outline" size={16} color={iconMuted} />
          <TextInput
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Search videos..."
            placeholderTextColor={iconMuted}
            className="flex-1 text-[14px] text-foreground"
          />
          {query.length > 0 && (
            <Pressable onPress={() => onChangeQuery("")} hitSlop={8}>
              <X size={15} color={iconMuted} />
            </Pressable>
          )}
        </View>
      </View>
    </VStack>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { videosData, isLoading, isError, error, refetch, isRefetching } =
    useVideos();

  const languageCode = useLanguageStore((s) => s.languageCode);

  const videos = useMemo(
    () => (videosData ? videosData[languageCode] ?? [] : []),
    [videosData, languageCode],
  );

  const filteredVideos = useMemo(
    () =>
      videos.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.channelName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q)
        );
      }),
    [videos, searchQuery],
  );

  const header = (
    <VideosHeader query={searchQuery} onChangeQuery={setSearchQuery} />
  );

  // ── Loading ────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Box className="flex-1 bg-background">
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <FlatList
            data={[1, 2, 3]}
            keyExtractor={(item) => item.toString()}
            ListHeaderComponent={header}
            renderItem={({ index }) =>
              index === 0 ? (
                <VideoCardFeaturedSkeleton />
              ) : (
                <VideoCardCompactSkeleton />
              )
            }
            contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Box>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <Box className="flex-1 bg-background">
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          {header}
          <NoResultsFound
            icon={AlertTriangle}
            title="Couldn't load videos"
            description={
              error?.message ?? "Something went wrong. Pull down to retry."
            }
          />
        </SafeAreaView>
      </Box>
    );
  }

  // ── Content ────────────────────────────────────────────────────────────
  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={header}
          renderItem={({ item, index }) => (
            <VideoCard item={item} />
          )}
          ListEmptyComponent={
            <NoResultsFound description="Try searching for something else." />
          }
          onRefresh={refetch}
          refreshing={isRefetching}
          contentContainerStyle={{ paddingBottom: 120, gap: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </SafeAreaView>
    </Box>
  );
};

export default Videos;
