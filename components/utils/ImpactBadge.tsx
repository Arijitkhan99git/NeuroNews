import { CircleAlert, Flame, Info } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

type Impact = "critical" | "high" | "medium" | "low";

interface ImpactBadgeProps {
  impact: string;
}

const impactConfig: Record<
  Impact,
  {
    label: string;
    color: string;
    bg: string;
    Icon: typeof CircleAlert;
  }
> = {
  critical: {
    label: "Critical",
    color: "#DC2626",
    bg: "#FEE2E2",
    Icon: CircleAlert,
  },
  high: {
    label: "High",
    color: "#EA580C",
    bg: "#FFEDD5",
    Icon: Flame,
  },
  medium: {
    label: "Medium",
    color: "#D97706",
    bg: "#FEF3C7",
    Icon: Info,
  },
  low: {
    label: "Low",
    color: "#16A34A",
    bg: "#DCFCE7",
    Icon: Info,
  },
};

const ImpactBadge = ({ impact }: ImpactBadgeProps) => {
  const config = impactConfig[impact.toLowerCase() as Impact] ?? {
    label: impact,
    color: "#6B7280",
    bg: "#F3F4F6",
    Icon: Info,
  };

  const { Icon } = config;

  return (
    <View
      className="self-start flex-row items-center rounded-full px-2 py-1"
      style={{ backgroundColor: config.bg }}
    >
      <Icon size={12} color={config.color} strokeWidth={2.5} />

      <Text
        className="ml-1 text-xs font-semibold"
        style={{
          color: config.color,
          lineHeight: 16,
        }}
      >
        {config.label}
      </Text>
    </View>
  );
};

export default ImpactBadge;
