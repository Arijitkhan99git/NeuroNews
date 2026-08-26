// components/settings/SettingsRow.tsx
import { HStack } from "@/components/ui/hstack";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, Text } from "react-native";

import { Icon } from "@/components/ui/icon";

interface SettingsRowProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
}

export function SettingsRow({
  icon,
  label,
  value,
  rightElement,
  showChevron = false,
  onPress,
}: SettingsRowProps) {
  const content = (
    <HStack className="items-center justify-between px-4 py-3.5">
      <HStack className="items-center gap-3">
        <Icon as={icon} size="md" className="text-primary" />
        <Text className="text-foreground text-base">{label}</Text>
      </HStack>

      <HStack className="items-center gap-1.5">
        {value ? (
          <Text className="text-muted-foreground text-base">{value}</Text>
        ) : null}
        {rightElement}
        {showChevron ? (
          <Icon as={ChevronRight} size="sm" className="text-muted-foreground" />
        ) : null}
      </HStack>
    </HStack>
  );

  return onPress ? (
    <Pressable onPress={onPress} className="active:opacity-70">
      {content}
    </Pressable>
  ) : (
    content
  );
}
