import { Button, ButtonText } from "@/components/ui/button";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-background"
    >
      <Button variant="default" size="default" className="bg-accent-foreground">
        <ButtonText className="text-muted">Button</ButtonText>
      </Button>
    </View>
  );
}
