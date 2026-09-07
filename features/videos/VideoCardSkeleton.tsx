import React from "react";
import { StyleSheet, View } from "react-native";

const Shimmer = ({ style }: { style?: object }) => (
  <View style={[styles.shimmer, style]} />
);

export const VideoCardFeaturedSkeleton = () => (
  <View style={styles.featuredContainer}>
    {/* Thumbnail skeleton */}
    <View style={styles.featuredThumb}>
      <Shimmer style={{ flex: 1 }} />
    </View>
    {/* Info skeleton */}
    <View style={styles.info}>
      <Shimmer style={styles.badge} />
      <Shimmer style={styles.titleLine1} />
      <Shimmer style={styles.titleLine2} />
      <View style={styles.metaRow}>
        <Shimmer style={styles.metaChip} />
        <Shimmer style={styles.metaChip} />
        <Shimmer style={styles.metaChip} />
      </View>
      <Shimmer style={styles.summaryLine1} />
      <Shimmer style={styles.summaryLine2} />
      <Shimmer style={styles.summaryLine3} />
    </View>
  </View>
);

export const VideoCardCompactSkeleton = () => (
  <View style={styles.compactContainer}>
    <Shimmer style={styles.compactThumb} />
    <View style={styles.compactInfo}>
      <Shimmer style={styles.badge} />
      <Shimmer style={styles.compactTitle1} />
      <Shimmer style={styles.compactTitle2} />
      <Shimmer style={styles.metaChip} />
    </View>
  </View>
);

const BASE = "rgba(148, 163, 184, 0.15)";

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: BASE,
    borderRadius: 8,
  },
  featuredContainer: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  featuredThumb: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: BASE,
  },
  info: { padding: 16, gap: 10 },
  badge: { height: 22, width: 120, borderRadius: 20 },
  titleLine1: { height: 22, width: "90%", borderRadius: 8 },
  titleLine2: { height: 22, width: "60%", borderRadius: 8 },
  metaRow: { flexDirection: "row", gap: 8 },
  metaChip: { height: 14, width: 60, borderRadius: 6 },
  summaryLine1: { height: 14, width: "100%", borderRadius: 6 },
  summaryLine2: { height: 14, width: "100%", borderRadius: 6 },
  summaryLine3: { height: 14, width: "70%", borderRadius: 6 },

  compactContainer: {
    flexDirection: "row",
    gap: 12,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  compactThumb: {
    width: 120,
    aspectRatio: 16 / 9,
    borderRadius: 10,
    backgroundColor: BASE,
    flexShrink: 0,
  },
  compactInfo: { flex: 1, gap: 8, justifyContent: "center" },
  compactTitle1: { height: 16, width: "100%", borderRadius: 6 },
  compactTitle2: { height: 16, width: "75%", borderRadius: 6 },
});
