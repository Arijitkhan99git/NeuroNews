import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import React from "react";

interface FundingCardProps {
  company: string;
  amount: string;
  sector: string;
  detail: string;
}

const FundingCard = ({ company, amount, sector, detail }: FundingCardProps) => {
  return (
    <Box className="mb-3 rounded-xl bg-card p-4">
      <HStack className="items-center justify-between">
        <Text
          className="flex-1 text-base font-semibold text-primaryText"
          numberOfLines={1}
        >
          {company}
        </Text>

        <Text className="ml-3 text-lg font-semibold text-blue-500">
          {amount}
        </Text>
      </HStack>

      <Text className="mt-2 text-sm text-muted-foreground" numberOfLines={1}>
        {sector} • {detail}
      </Text>
    </Box>
  );
};

export default FundingCard;
