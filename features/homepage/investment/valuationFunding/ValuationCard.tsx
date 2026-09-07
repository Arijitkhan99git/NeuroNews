import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

interface ValuationCardProps {
  company: string;
  valuation: string;
  detail: string;
}

const ValuationCard = ({ company, valuation, detail }: ValuationCardProps) => {
  return (
    <Box className="rounded-xl bg-card p-4">
      <HStack className="items-center justify-between">
        <VStack className="flex-1">
          <Text
            className="text-base font-semibold text-primaryText"
            numberOfLines={1}
          >
            {company}
          </Text>

          <Text
            className="mt-1 text-sm text-muted-foreground"
            numberOfLines={1}
          >
            {detail}
          </Text>
        </VStack>

        <Text className="ml-3 text-lg font-semibold text-sky-500">
          {valuation}
        </Text>
      </HStack>
    </Box>
  );
};

export default ValuationCard;
