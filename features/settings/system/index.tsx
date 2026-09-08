import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import { Info, ReceiptText, ShieldLock } from "lucide-react-native";
import React, { useState } from "react";
import { Text } from "react-native";
import { IconWrap } from "../components/IconWrap";
import { SettingsRow } from "../settingsRow/SettingsRow";
import AboutModal from "./AboutModal";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";

const System = () => {
  const [privacyModal, setPrivacyModal] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  return (
    <VStack className="gap-2">
      <Text className="text-muted-foreground">System</Text>

      <VStack className="bg-card rounded-2xl border border-surface-border overflow-hidden">
        <SettingsRow
          icon={
            <IconWrap bg="#2A835F">
              <ShieldLock size={20} color="#FFFFFF" strokeWidth={2} />
            </IconWrap>
          }
          label="Privacy & Security"
          showChevron
          onPress={() => setPrivacyModal(true)}
        />
        <Divider className="bg-surface-border" />
        <SettingsRow
          icon={
            <IconWrap bg="#601D49">
              <ReceiptText size={20} color="#FFFFFF" strokeWidth={2} />
            </IconWrap>
          }
          label="Terms of Service"
          showChevron
          onPress={() => setTermsModal(true)}
        />
        <Divider className="bg-surface-border" />
        <SettingsRow
          icon={
            <IconWrap bg="#6ccaffff">
              <Info size={20} color="#FFFFFF" strokeWidth={2} />
            </IconWrap>
          }
          label="About NeuroNews"
          showChevron
          onPress={() => setAboutModal(true)}
        />
      </VStack>

      <PrivacyModal
        isOpen={privacyModal}
        onClose={() => setPrivacyModal(false)}
      />

      <TermsModal isOpen={termsModal} onClose={() => setTermsModal(false)} />

      <AboutModal isOpen={aboutModal} onClose={() => setAboutModal(false)} />
    </VStack>
  );
};

export default System;
