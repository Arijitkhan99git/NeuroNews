import { QUERY_CONFIG } from "@/api/config";
import { fetchQueryKey } from "@/api/query-key";
import { fetchTrendingNews } from "@/api/services/trending-services";
import { fetchWeeks } from "@/api/services/weeks-services";
import { useQuery } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

const AiDaily = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Step 1: fetch available weeks to get the most recent period with data
  const { data: weeksData } = useQuery({
    queryKey: ["weeks"],
    queryFn: fetchWeeks,
    ...QUERY_CONFIG.static, // weeks list rarely changes
  });

  // Pick the first day of the most recent available week
  const latestPeriodId = weeksData?.weeks[0]?.days[0]?.id ?? null;

  // Step 2: fetch trends for that period (only runs once we have a periodId)
  const { data: trendingData, isLoading } = useQuery({
    queryKey: fetchQueryKey.trending(latestPeriodId ?? ""),
    queryFn: () => fetchTrendingNews(latestPeriodId!),
    enabled: !!latestPeriodId, // wait until we have a valid period
    ...QUERY_CONFIG.default,
  });

  console.log("latestPeriodId:", latestPeriodId);
  console.log("trendingData:", trendingData);

  const trendingCount = trendingData?.trends.en.length;

  return (
    <View className={isDark ? "bg-gray-700" : "bg-gray-200"}>
      <Text className="text-primary pb-3">AI DAILY INTEL</Text>
      <View>
        <Text className="text-white">{trendingCount}</Text>
        <Text>Trending</Text>
      </View>
    </View>
  );
};

export default AiDaily;
