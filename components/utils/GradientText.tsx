// components/GradientText.tsx
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TextProps } from "react-native";

interface GradientTextProps extends TextProps {
  colors?: readonly [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export function GradientText({
  colors = ["#818cf8", "#c084fc"], // indigo -> purple, adjust to your palette
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  children,
  ...rest
}: GradientTextProps) {
  return (
    <MaskedView
      maskElement={
        <Text style={style} {...rest}>
          {children}
        </Text>
      }
    >
      <LinearGradient colors={colors} start={start} end={end}>
        <Text style={[style, { opacity: 0 }]} {...rest}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}
