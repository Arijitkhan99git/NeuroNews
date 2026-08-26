// components/settings/LanguagePickerModal.tsx
import { QUERY_CONFIG } from "@/api/config";
import { fetchLanguages } from "@/api/services/language-services";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react-native";
import React from "react";
import { FlatList, Modal, Pressable, View } from "react-native";

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguagePickerModal({
  isOpen,
  onClose,
}: LanguagePickerModalProps) {
  const languageCode = useLanguageStore((s) => s.languageCode);
  const setLanguageCode = useLanguageStore((s) => s.setLanguageCode);

  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
    ...QUERY_CONFIG.static, // fixed list, rarely changes
  });

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="modal-overlay justify-end">
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View className="modal-container">
          <View className="modal-header">
            <Text className="modal-title">Language</Text>
            <Pressable className="modal-close" onPress={onClose}>
              <Text className="modal-close-text">✕</Text>
            </Pressable>
          </View>

          <View className="modal-body">
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              ItemSeparatorComponent={() => <View className="h-px bg-border" />}
              renderItem={({ item }) => {
                const selected = item.code === languageCode;
                return (
                  <Pressable
                    className="picker-row items-center justify-between py-3"
                    onPress={() => {
                      setLanguageCode(item.code);
                      onClose();
                    }}
                  >
                    <View>
                      <Text className="text-foreground text-base">
                        {item.label}
                      </Text>
                      <Text className="text-muted-foreground text-sm">
                        {item.nativeLabel}
                      </Text>
                    </View>
                    {selected ? (
                      <Icon as={Check} size="sm" className="text-primary" />
                    ) : null}
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
