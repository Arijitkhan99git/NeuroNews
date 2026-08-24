import { createExtendedQueryKeys } from "./query-key-factory";

export const fetchQueryKey = createExtendedQueryKeys("home", {
  trending: (periodId: string) => ["home", "trending", periodId] as const,
});
