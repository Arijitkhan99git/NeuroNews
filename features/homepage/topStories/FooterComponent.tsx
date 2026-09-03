import { HStack } from "@/components/ui/hstack";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";

import { Dimensions, Pressable, Text } from "react-native";

const CARD_WIDTH = Dimensions.get("window").width * 0.75;

export function ListFooterComponent() {
  return (
    <Pressable
      onPress={() => router.navigate("/news")}
      style={{ width: CARD_WIDTH }}
      className="center h-full flex-1 rounded-2xl bg-card border border-border overflow-hidden p-4"
    >
      <HStack className="gap-1 center">
        <Text className=" text-muted text-lg">View all top tech news</Text>
        <ArrowRight color="#af96eccc" size={21} />
      </HStack>
    </Pressable>
  );
}
