import { Box } from "@/components/ui/box";
import { ChevronDownIcon } from "@/components/ui/icon";
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from "@/components/ui/select";
import { useThemeStore } from "@/store/useThemeStore";
import { Palette } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const IconWrap = ({ bg }: { bg: string }) => {
  return (
    <Box
      style={{
        backgroundColor: bg,
        padding: 8,
      }}
      className="rounded-full mr-2"
    >
      <Palette size={22} color="#FFFFFF" strokeWidth={2} />
    </Box>
  );
};

const Appearance = () => {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  const modeLabels: Record<typeof mode, string> = {
    system: "Default",
    light: "Light",
    dark: "Dark",
  };

  return (
    <Box className="flex gap-2">
      <Text className="text-muted-foreground">Preferences</Text>
      <Box className="bg-secondary w-full p-4 flex flex-row justify-between rounded-lg items-center">
        <Box className="flex flex-row items-center gap-2">
          <IconWrap bg="#7C8BE0" />
          <Text className="text-gray-300 text-lg">Appearance</Text>
        </Box>

        <Box>
          <Select
            selectedValue={mode}
            onValueChange={(value) => setMode(value as typeof mode)}
          >
            <SelectTrigger
              variant="outline"
              size="md"
              className="rounded-xl px-2"
            >
              <SelectInput
                placeholder="Select option"
                value={modeLabels[mode]}
              />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Default" value="system" />
                <SelectItem label="Light" value="light" />
                <SelectItem label="Dark" value="dark" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default Appearance;
