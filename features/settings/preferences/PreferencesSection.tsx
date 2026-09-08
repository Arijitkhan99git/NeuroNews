import { Divider } from "@/components/ui/divider";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { LanguagePickerModal } from "@/features/modals/LanguagePickerModal";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Bell, Globe } from "lucide-react-native";
import React, { useState } from "react";
import { IconWrap } from "../components/IconWrap";
import { SettingsRow } from "../settingsRow/SettingsRow";

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  de: "German",
  zh: "Chinese",
  fr: "French",
  es: "Spanish",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
};

export function PreferencesSection() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const languageCode = useLanguageStore((s) => s.languageCode);

  // Dummy for now — not wired to real push-notification state yet
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <VStack className="gap-2">
      <Text className="text-muted-foreground">Preferences</Text>

      <VStack className="bg-card rounded-2xl border border-surface-border overflow-hidden">
        <SettingsRow
          icon={
            <IconWrap bg="#645cf0ff">
              <Globe size={20} color="#FFFFFF" strokeWidth={2} />
            </IconWrap>
          }
          label="Language"
          value={LANGUAGE_LABELS[languageCode] ?? languageCode}
          showChevron
          onPress={() => setPickerOpen(true)}
        />
        <Divider className="bg-surface-border" />
        <SettingsRow
          icon={
            <IconWrap bg="#f4b54aff">
              <Bell size={20} color="#FFFFFF" strokeWidth={2} />
            </IconWrap>
          }
          label="Notifications"
          rightElement={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          }
        />
      </VStack>

      <LanguagePickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
      />
    </VStack>
  );
}
