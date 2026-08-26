import React from "react";
import { Text, View } from "react-native";

interface SectionHeadingProps {
  text: string;
  style: string;
}

const SectionHeading = ({ text, style }: SectionHeadingProps) => {
  return (
    <View>
      <Text className={style}>{text}</Text>
    </View>
  );
};

export default SectionHeading;
