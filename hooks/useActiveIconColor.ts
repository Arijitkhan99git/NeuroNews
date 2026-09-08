import { useColorScheme } from "nativewind";

export default function useActiveIconColor() {
  const { colorScheme } = useColorScheme();
  return colorScheme === "dark" ? "#b9a0f8cc" : "#8B5CF6";
}
