import { LucideIcon, SearchX } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text } from "react-native";

interface NoResultsFoundProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  iconSize?: number;
}

const NoResultsFound = ({
  icon: Icon = SearchX,
  title = "No results found",
  description = "Try adjusting your filters.",
  iconSize = 52,
}: NoResultsFoundProps) => {
  const { colorScheme } = useColorScheme();
  const iconMuted = colorScheme === "dark" ? "#9ca3af" : "#64748b";

  return (
    <Box className="flex-1 items-center justify-center py-20 px-4">
      <Box className="bg-surface border border-surface-border p-6 rounded-full mb-6">
        <Icon color={iconMuted} size={iconSize} strokeWidth={1.5} />
      </Box>

      <Text className="text-foreground text-base font-semibold text-center">
        {title}
      </Text>

      {description ? (
        <Text className="text-muted-foreground text-sm text-center mt-1 max-w-[260px]">
          {description}
        </Text>
      ) : null}
    </Box>
  );
};

export default NoResultsFound;
