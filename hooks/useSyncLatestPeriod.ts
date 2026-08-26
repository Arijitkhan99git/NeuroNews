import { QUERY_CONFIG } from "@/api/config";
import { fetchWeeks } from "@/api/services/weeks-services";
import { useLatestPeriodStore } from "@/store/usePeriodIdStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useSyncLatestPeriod() {
  const setLatestPeriodId = useLatestPeriodStore((s) => s.setLatestPeriodId);

  // fetch available weeks to get the most recent period with data
  const { data: weeksData } = useQuery({
    queryKey: ["weeks"],
    queryFn: fetchWeeks,
    ...QUERY_CONFIG.static,
  });

  // Pick the first day of the most recent available week
  useEffect(() => {
    const days = weeksData?.weeks[0]?.days ?? [];
    const currentDay = days.find((d) => d.current);
    const latestPeriodId = currentDay?.id ?? days[0]?.id ?? null;
    setLatestPeriodId(latestPeriodId);
  }, [weeksData, setLatestPeriodId]);
}
