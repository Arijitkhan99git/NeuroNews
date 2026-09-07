// hooks/useVideos.ts
import { QUERY_CONFIG } from "@/api/config";
import { fetchQueryKey } from "@/api/query-key";
import { fetchVideos } from "@/api/services/videos-services";
import { useLatestPeriodStore } from "@/store/usePeriodIdStore";
import { useQuery } from "@tanstack/react-query";

export function useVideos() {
  const latestPeriodId = useLatestPeriodStore((s) => s.latestPeriodId);

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: fetchQueryKey.video(latestPeriodId ?? ""),
    queryFn: () => fetchVideos(latestPeriodId!),
    enabled: !!latestPeriodId,
    ...QUERY_CONFIG.default,
  });

  return {
    videosData: data,
    isLoading: !latestPeriodId || isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
}
