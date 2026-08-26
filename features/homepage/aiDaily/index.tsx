import { QUERY_CONFIG } from "@/api/config";
import { LanguageCode } from "@/api/model/language-model";
import { fetchQueryKey } from "@/api/query-key";
import { fetchInvestmentNews } from "@/api/services/investment-services";
import { fetchTechNews } from "@/api/services/techNews-services";
import { fetchTrendingNews } from "@/api/services/trending-services";
import { Divider } from "@/components/ui/divider";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { useSyncLatestPeriod } from "@/hooks/useSyncLatestPeriod";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useLatestPeriodStore } from "@/store/usePeriodIdStore";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Cpu } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

interface StatItemProps {
  count: number;
  label: string;
  isLoading: boolean;
}

function StatItem({ count, label, isLoading }: StatItemProps) {
  return (
    <View className="flex-1 items-center justify-center py-4">
      <Skeleton
        variant="rounded"
        className="h-7 w-10 mb-1"
        isLoaded={!isLoading}
      >
        <Text className="text-foreground text-2xl font-bold">{count}</Text>
      </Skeleton>
      <SkeletonText _lines={1} className="h-3 w-14" isLoaded={!isLoading}>
        <Text className="text-muted-foreground text-xs tracking-wide mt-1">
          {label}
        </Text>
      </SkeletonText>
    </View>
  );
}

const AiDaily = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  useSyncLatestPeriod();

  const latestPeriodId = useLatestPeriodStore((s) => s.latestPeriodId);

  const currentLanguage: LanguageCode =
    useLanguageStore((l) => l.languageCode) ?? "en";

  const { data: techNewsData, isLoading: techNewsloading } = useQuery({
    queryKey: fetchQueryKey.tech(latestPeriodId ?? ""),
    queryFn: () => fetchTechNews(latestPeriodId!),
    enabled: !!latestPeriodId,
    ...QUERY_CONFIG.default,
  });

  const techNewsCount = techNewsData?.[currentLanguage].length;

  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: fetchQueryKey.trending(latestPeriodId ?? ""),
    queryFn: () => fetchTrendingNews(latestPeriodId!),
    enabled: !!latestPeriodId,
    ...QUERY_CONFIG.default,
  });

  const trendingCount = trendingData?.trends.en.length;

  const { data: fetchInvestmentData, isLoading: investmentLoading } = useQuery({
    queryKey: fetchQueryKey.investment(latestPeriodId ?? ""),
    queryFn: () => fetchInvestmentNews(latestPeriodId!),
    enabled: !!latestPeriodId,
    ...QUERY_CONFIG.default,
  });

  const investmentTotalCount = fetchInvestmentData
    ? Object.values(fetchInvestmentData).reduce(
        (total, category) => total + (category[currentLanguage]?.length ?? 0),
        0,
      )
    : 0;

  return (
    <View
      className={clsx(
        isDark ? "bg-gray-800" : "bg-gray-200",
        "px-4 py-6 mt-10 rounded-xl",
      )}
    >
      <View className="flex flex-row items-center justify-between mb-5">
        <View className="px-3 py-1 bg-[#004E5C] self-start rounded-md">
          <Text className="text-primary text-center">AI DAILY INTEL</Text>
        </View>
        <Cpu color="#2563eb" />
      </View>

      <View className="flex-row items-stretch bg-card rounded-2xl border border-border overflow-hidden">
        <StatItem
          count={techNewsCount ?? 0}
          label="News"
          isLoading={techNewsloading}
        />
        <Divider orientation="vertical" className="bg-border" />
        <StatItem
          count={trendingCount ?? 0}
          label="Trending"
          isLoading={trendingLoading}
        />
        <Divider orientation="vertical" className="bg-border" />
        <StatItem
          count={investmentTotalCount ?? 0}
          label="Signals"
          isLoading={investmentLoading}
        />
      </View>
    </View>
  );
};

export default AiDaily;
