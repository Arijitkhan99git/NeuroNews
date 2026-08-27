import { useThemeStore } from "@/store/useThemeStore";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TextProps } from "react-native";

interface SectionHeadingProps extends TextProps {
  colors?: readonly [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export function SectionHeading({
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  children,
  ...rest
}: SectionHeadingProps) {
  const mode = useThemeStore((s) => s.mode);

  const gradientColors =
    mode === "dark" || mode === "system"
      ? (["#A684FF", "#9C99C1"] as const)
      : (["#6366f1", "#8b5cf6"] as const);

  const textStyle = [
    { fontSize: 20, fontWeight: "600" as const, lineHeight: 24 },
    style,
  ];

  return (
    <MaskedView
      maskElement={
        <Text style={textStyle} {...rest}>
          {children}
        </Text>
      }
    >
      <LinearGradient colors={gradientColors} start={start} end={end}>
        <Text style={[textStyle, { opacity: 0 }]} {...rest}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}
