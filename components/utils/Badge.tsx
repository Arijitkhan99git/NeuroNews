import { Badge, BadgeText } from "@/components/ui/badge";
import React from "react";

interface BadgeProps {
  text: string;
}

const CustomBadge = ({ text }: BadgeProps) => {
  return (
    // <View className="self-start rounded-full bg-[#004E5C] flex items-center justify-center px-2 py-1">
    //   <Text
    //     className="text-primary"
    //     style={{
    //       fontSize: 12,
    //     }}
    //   >
    //     {text}
    //   </Text>
    // </View>

    <Badge variant="secondary">
      <BadgeText>New</BadgeText>
    </Badge>
  );
};

export default CustomBadge;
