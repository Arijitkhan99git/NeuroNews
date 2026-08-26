// hooks/useInvestmentNews.ts
import { QUERY_CONFIG } from "@/api/config";
import { fetchQueryKey } from "@/api/query-key";
import { fetchInvestmentNews } from "@/api/services/investment-services";
import { useLatestPeriodStore } from "@/store/usePeriodIdStore";
import { useQuery } from "@tanstack/react-query";

export function useInvestmentNews() {
  const latestPeriodId = useLatestPeriodStore((s) => s.latestPeriodId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: fetchQueryKey.investment(latestPeriodId ?? ""),
    queryFn: () => fetchInvestmentNews(latestPeriodId!),
    enabled: !!latestPeriodId,
    ...QUERY_CONFIG.default,
  });

  return {
    investmentData: data,
    isLoading: !latestPeriodId || isLoading,
    isError,
    error,
  };
}
