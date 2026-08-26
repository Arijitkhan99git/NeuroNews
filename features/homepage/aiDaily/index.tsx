import { QUERY_CONFIG } from "@/api/config";
import { fetchQueryKey } from "@/api/query-key";
import { fetchTrendingNews } from "@/api/services/trending-services";
import { useSyncLatestPeriod } from "@/hooks/useSyncLatestPeriod";
import { useLatestPeriodStore } from "@/store/usePeriodIdStore";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Cpu } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

const AiDaily = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  useSyncLatestPeriod();

  const latestPeriodId = useLatestPeriodStore((s) => s.latestPeriodId);

  // Step 2: fetch trends for that period (only runs once we have a periodId)
  const { data: trendingData, isLoading } = useQuery({
    queryKey: fetchQueryKey.trending(latestPeriodId ?? ""),
    queryFn: () => fetchTrendingNews(latestPeriodId!),
    enabled: !!latestPeriodId, // wait until we have a valid period
    ...QUERY_CONFIG.default,
  });

  const trendingCount = trendingData?.trends.en.length;

  return (
    <View
      className={clsx(
        isDark ? "bg-gray-800" : "bg-gray-200",
        "p-4 mt-10 rounded-xl",
      )}
    >
      <View className="flex flex-row items-center justify-between">
        <View className="px-3 py-1 bg-[#004E5C] self-start rounded-md">
          <Text className="text-primary text-lg text-center">
            AI DAILY INTEL
          </Text>
        </View>
        <Cpu color="#2563eb" />
      </View>

      <View>
        <Text className="text-white">{trendingCount}</Text>
        <Text>Trending</Text>
      </View>
    </View>
  );
};

export default AiDaily;
