import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const TrendingCardSkeleton = () => {
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
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <View className="flex-row py-4 border-b border-border">
      <Animated.View style={{ opacity }} className="flex-row flex-1">
        {/* Rank placeholder */}
        <View className="ml-1 mr-3 justify-center">
          <View className="h-4 w-5 rounded bg-muted" />
        </View>

        {/* Content placeholder */}
        <View className="flex-1 gap-2">
          {/* Category badge */}
          <View className="h-5 w-20 rounded-md bg-muted" />

          {/* Title lines */}
          <View className="gap-1">
            <View className="h-4 w-full rounded bg-muted" />
            <View className="h-4 w-3/4 rounded bg-muted" />
          </View>

          {/* Meta row */}
          <View className="flex-row items-center gap-2 mt-1">
            <View className="h-3 w-14 rounded bg-muted" />
            <View className="h-3 w-3 rounded-full bg-muted" />
            <View className="h-3 w-20 rounded bg-muted" />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default TrendingCardSkeleton;
