// hooks/useTechNews.ts
import { QUERY_CONFIG } from "@/api/config";
import { fetchQueryKey } from "@/api/query-key";
import { fetchTechNews } from "@/api/services/techNews-services";
import { useLatestPeriodStore } from "@/store/usePeriodIdStore";
import { useQuery } from "@tanstack/react-query";

export function useTechNews() {
  const latestPeriodId = useLatestPeriodStore((s) => s.latestPeriodId);

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: fetchQueryKey.tech(latestPeriodId ?? ""),
    queryFn: () => fetchTechNews(latestPeriodId!),
    enabled: !!latestPeriodId,
    ...QUERY_CONFIG.default,
  });

  return {
    techNewsData: data,
    isLoading: !latestPeriodId || isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
}
