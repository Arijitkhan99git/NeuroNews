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
import { Palette } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const Settings = () => {
  return (
    <Box className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Box className="flex gap-2">
          <Text className="text-muted-foreground">Preferences</Text>
          <Box className="bg-secondary w-full p-4 flex flex-row justify-between rounded-lg items-center">
            <Box className="flex flex-row items-center gap-2">
              <IconWrap bg="#7C8BE0" />

              <Text className="text-gray-300 text-lg">Appearance</Text>
            </Box>

            <Box>
              <Select>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Select option" />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="UX Research" value="ux" />
                    <SelectItem label="Web Development" value="web" />
                    <SelectItem
                      label="Cross Platform Development Process"
                      value="Cross Platform Development Process"
                    />
                    <SelectItem
                      label="UI Designing"
                      value="ui"
                      isDisabled={true}
                    />
                    <SelectItem label="Backend Development" value="backend" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    </Box>
  );
};
export default Settings;
