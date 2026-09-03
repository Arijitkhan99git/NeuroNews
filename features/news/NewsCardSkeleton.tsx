import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const NewsCardSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <View className="w-full rounded-2xl bg-card border border-border overflow-hidden p-4">
      <Animated.View style={{ opacity }} className="gap-3">
        {/* Category badge placeholder */}
        <View className="h-6 w-20 rounded-full bg-muted" />

        {/* Content text lines placeholder */}
        <View className="gap-2">
          <View className="h-4 w-full rounded bg-muted" />
          <View className="h-4 w-full rounded bg-muted" />
          <View className="h-4 w-2/3 rounded bg-muted" />
        </View>

        {/* Source + impact badge row */}
        <View className="flex-row items-center justify-between mt-1">
          <View className="h-3 w-16 rounded bg-muted" />
          <View className="h-5 w-14 rounded-full bg-muted" />
        </View>

        {/* Read more row */}
        <View className="flex-row justify-end items-center gap-1 mt-2">
          <View className="h-3 w-16 rounded bg-muted" />
        </View>
      </Animated.View>
    </View>
  );
};

export default NewsCardSkeleton;
