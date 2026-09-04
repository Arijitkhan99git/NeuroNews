import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface MarketMoveItemProps {
  ticker: string;

  description: string;
  price?: string;
  change?: string;
  timestamp: string;
  direction?: string;
}

const MarketMoveItem = ({
  ticker,

  description,
  price,
  change,
  timestamp,
  direction,
}: MarketMoveItemProps) => {
  const isUp = direction === "up";

  return (
    <Box className="border-b border-border py-4">
      <HStack className="items-start justify-between">
        <HStack className="flex-1 items-center gap-3">
          <Box className="rounded-md bg-muted px-2 py-1">
            <Text className="text-xs font-bold text-foreground">{ticker}</Text>
          </Box>

          <VStack className="flex-1">
            <Text
              className="mt-1 text-sm text-muted-foreground"
              numberOfLines={3}
            >
              {description}
            </Text>
          </VStack>
        </HStack>

        {direction && (
          <Text
            className={`ml-2 text-sm font-bold ${isUp ? "text-emerald-400" : "text-red-400"
              }`}
          >
            {isUp ? "↗" : "↘"} {change}
          </Text>
        )}
      </HStack>

      {price && (
        <Text className="mt-2 text-xs text-muted-foreground">
          Price: {price}
        </Text>
      )}

      <Text className="mt-1 text-xs text-primaryText">{timestamp}</Text>
    </Box>
  );
};

export default MarketMoveItem;
