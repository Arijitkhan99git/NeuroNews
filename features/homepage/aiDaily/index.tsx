import { QUERY_CONFIG } from "@/api/config";
import { LanguageCode } from "@/api/model/language-model";
import { fetchQueryKey } from "@/api/query-key";
import { fetchInvestmentNews } from "@/api/services/investment-services";
import { fetchTechNews } from "@/api/services/techNews-services";
import { fetchTrendingNews } from "@/api/services/trending-services";
import { Divider } from "@/components/ui/divider";
import { Skeleton } from "@/components/ui/skeleton";
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
      {/* Count */}
      {isLoading ? (
        <Skeleton variant="rounded" className="h-7 w-12 mb-2 bg-gray-700" />
      ) : (
        <Text className="text-foreground text-2xl font-bold mb-1">{count}</Text>
      )}

      {/* Label */}
      {isLoading ? (
        <Skeleton variant="rounded" className="h-3 w-14 bg-gray-700" />
      ) : (
        <Text className="text-[#817EA1] text-xs tracking-wide">{label}</Text>
      )}
    </View>
  );
}

const AiDaily = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const latestPeriodId = useLatestPeriodStore((s) => s.latestPeriodId);

  const isPeriodReady = !!latestPeriodId;

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
        isDark ? "bg-[#100F19]" : "bg-gray-200",
        "px-4 py-6 rounded-xl",
      )}
    >
      <View className="flex flex-row items-center justify-between mb-5">
        <View className="px-3 py-1 bg-badgebackground self-start rounded-md">
          <Text className="text-badgeText text-center text-sm py-0.5">
            AI DAILY INTEL
          </Text>
        </View>
        <Cpu color="#A684FF" />
      </View>

      <View className="flex-row items-stretch bg-card rounded-2xl border border-border overflow-hidden">
        <StatItem
          count={techNewsCount ?? 0}
          label="News"
          isLoading={!isPeriodReady || techNewsloading}
        />
        <Divider orientation="vertical" className="bg-border" />
        <StatItem
          count={trendingCount ?? 0}
          label="Trending"
          isLoading={!isPeriodReady || trendingLoading}
        />
        <Divider orientation="vertical" className="bg-border" />
        <StatItem
          count={investmentTotalCount ?? 0}
          label="Signals"
          isLoading={!isPeriodReady || investmentLoading}
        />
      </View>
    </View>
  );
};

export default AiDaily;
