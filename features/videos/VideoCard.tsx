import { VideoResponse } from "@/api/model/videos-model";
import CustomBadge from "@/components/utils/Badge";
import { Clock, Eye, ThumbsUp } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

function formatViewCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

function formatPublishedAt(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface VideoCardProps {
  item: VideoResponse;
  featured?: boolean;
}

const VideoCard = ({ item, featured = true }: VideoCardProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const mutedColor = isDark ? "#94a3b8" : "#64748b";

  function handlePress() {
    const url = `https://www.youtube.com/watch?v=${item.videoId}`;
    Linking.openURL(url);
  }

  if (featured) {
    return (
      // bg-card + border-border from design tokens
      <Pressable
        onPress={handlePress}
        className="rounded-[20px] overflow-hidden bg-card border border-border"
      >
        {/* Thumbnail */}
        <View style={styles.featuredThumbWrap} className="bg-surface">
          <Image
            source={{ uri: item.thumbnailUrl }}
            style={styles.featuredThumb}
            resizeMode="cover"
          />
          {/* Duration badge */}
          <View style={styles.durationBadge}>
            <Clock size={10} color="#fff" />
            <Text style={styles.durationText}>{item.durationFormatted}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.featuredInfo}>
          <CustomBadge text={item.category} />

          <Text
            style={[styles.featuredTitle, { color: isDark ? "#f1f5f9" : "#0f172a" }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          {/* Meta row */}
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: mutedColor }]}>
              {item.channelName}
            </Text>
            <Text style={[styles.metaDot, { color: mutedColor }]}>·</Text>
            <Eye size={12} color={mutedColor} />
            <Text style={[styles.metaText, { color: mutedColor }]}>
              {formatViewCount(item.viewCount)}
            </Text>
            <Text style={[styles.metaDot, { color: mutedColor }]}>·</Text>
            <ThumbsUp size={12} color={mutedColor} />
            <Text style={[styles.metaText, { color: mutedColor }]}>
              {formatViewCount(item.likeCount)}
            </Text>
            <Text style={[styles.metaDot, { color: mutedColor }]}>·</Text>
            <Text style={[styles.metaText, { color: mutedColor }]}>
              {formatPublishedAt(item.publishedAt)}
            </Text>
          </View>

          {/* Summary */}
          <Text
            style={[styles.summary, { color: isDark ? "#cbd5e1" : "#475569" }]}
          // numberOfLines={3}
          >
            {item.summary}
          </Text>
        </View>
      </Pressable>
    );
  }

  // Compact card
  return (
    // bg-card + border-border from design tokens
    <Pressable
      onPress={handlePress}
      className="flex-row gap-3 rounded-2xl bg-card border border-border p-3"
    >
      <View style={styles.compactThumbWrap} className="bg-surface">
        <Image
          source={{ uri: item.thumbnailUrl }}
          style={styles.compactThumb}
          resizeMode="cover"
        />
        <View style={styles.durationBadgeSmall}>
          <Text style={styles.durationTextSmall}>{item.durationFormatted}</Text>
        </View>
      </View>

      <View style={styles.compactInfo}>
        <CustomBadge text={item.category} />
        <Text
          style={[styles.compactTitle, { color: isDark ? "#f1f5f9" : "#0f172a" }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: mutedColor }]} numberOfLines={1}>
            {item.channelName}
          </Text>
          <Text style={[styles.metaDot, { color: mutedColor }]}>·</Text>
          <Eye size={11} color={mutedColor} />
          <Text style={[styles.metaText, { color: mutedColor }]}>
            {formatViewCount(item.viewCount)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  // ─── Featured ─────────────────────────────────────────────────────────
  featuredThumbWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
  },
  featuredThumb: {
    width: "100%",
    height: "100%",
  },
  durationBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  durationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  featuredInfo: {
    padding: 16,
    gap: 10,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
  },
  metaText: {
    fontSize: 12,
  },
  metaDot: {
    fontSize: 12,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
  },

  // ─── Compact ───────────────────────────────────────────────────────────
  compactThumbWrap: {
    width: 120,
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
  },
  compactThumb: {
    width: "100%",
    height: "100%",
  },
  durationBadgeSmall: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  durationTextSmall: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  compactInfo: {
    flex: 1,
    gap: 6,
    justifyContent: "center",
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
});
