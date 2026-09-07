// hooks/useTrendingNews.ts
import { QUERY_CONFIG } from "@/api/config";
import { fetchQueryKey } from "@/api/query-key";
import { fetchTrendingNews } from "@/api/services/trending-services";
import { useLatestPeriodStore } from "@/store/usePeriodIdStore";
import { useQuery } from "@tanstack/react-query";

export function useTrendingNews() {
  const latestPeriodId = useLatestPeriodStore((s) => s.latestPeriodId);

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: fetchQueryKey.trending(latestPeriodId ?? ""),
    queryFn: () => fetchTrendingNews(latestPeriodId!),
    enabled: !!latestPeriodId,
    ...QUERY_CONFIG.default,
  });

  return {
    trendingData: data,
    isLoading: !latestPeriodId || isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
}
