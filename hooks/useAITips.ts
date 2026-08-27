// hooks/useInvestmentNews.ts
import { QUERY_CONFIG } from "@/api/config";
import { fetchQueryKey } from "@/api/query-key";
import { fetchAiTips } from "@/api/services/tips-services";
import { useLatestPeriodStore } from "@/store/usePeriodIdStore";
import { useQuery } from "@tanstack/react-query";

export function useAITips() {
  const latestPeriodId = useLatestPeriodStore((s) => s.latestPeriodId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: fetchQueryKey.tip(latestPeriodId ?? ""),
    queryFn: () => fetchAiTips(latestPeriodId!),
    enabled: !!latestPeriodId,
    ...QUERY_CONFIG.default,
  });

  return {
    aiTipsData: data,
    isLoading: !latestPeriodId || isLoading,
    isError,
    error,
  };
}
