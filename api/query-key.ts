import { createExtendedQueryKeys } from "./query-key-factory";

export const fetchQueryKey = createExtendedQueryKeys("home", {
  trending: (periodId: string) => ["home", "trending", periodId] as const,

  tech: (periodId: string) => ["home", "tech", periodId] as const,

  investment: (periodId: string) => ["home", "investment", periodId] as const,
});
