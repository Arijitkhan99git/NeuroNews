import { systemData, SystemItem } from "@/features/settings/data";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export type SystemModalType = "privacy" | "terms" | "about" | null;

interface SystemDetailModalProps {
  type: SystemModalType;
  isOpen: boolean;
  onClose: () => void;
}

const SystemDetailModal = ({
  type,
  isOpen,
  onClose,
}: SystemDetailModalProps) => {
  if (!type) return null;

  const data: SystemItem = systemData[type];

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <BlurView intensity={90} tint="dark" style={{ flex: 1 }}>
        {/* Dark overlay backdrop — tap outside to close */}
        <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.55)",
            }}
          />
        </Pressable>

        {/* Centered card container */}
        <View
          style={{ flex: 1 }}
          className="items-center justify-center p-4"
          pointerEvents="box-none"
        >
          <View
            style={{ width: Math.min(SCREEN_WIDTH * 0.88, 440) }}
            pointerEvents="box-none"
          >
            {/* Close button — sits above the card, right-aligned */}
            <View className="w-full flex-row justify-end mb-3">
              <Pressable
                onPress={onClose}
                hitSlop={12}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "rgba(30,30,40,0.85)",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                <X size={18} color="#9ca3af" />
              </Pressable>
            </View>

            {/* Card */}
            <View
              style={{
                width: Math.min(SCREEN_WIDTH * 0.88, 440),
                height: Math.min(SCREEN_HEIGHT * 0.72, 600),
              }}
              className="rounded-3xl bg-card border border-border overflow-hidden p-6 flex-col justify-between"
            >
              {/* Header: Title & Subtitle */}
              <View className="pb-4 border-b border-surface-border">
                <Text className="text-xl font-bold text-foreground">
                  {data.title}
                </Text>
                {data.subtitle && (
                  <Text className="text-sm text-muted-foreground mt-1">
                    {data.subtitle}
                  </Text>
                )}
              </View>

              {/* Scrollable Inner Content */}
              <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingVertical: 18, gap: 18 }}
                className="flex-1"
              >
                {data.version && (
                  <View className="self-start rounded-full bg-primary-deep/15 px-3 py-1 border border-primary-deep/30 mb-1">
                    <Text className="text-xs font-bold text-primary">
                      Version {data.version}
                    </Text>
                  </View>
                )}

                {data.sections.map((section, idx) => (
                  <View key={idx} className="gap-2">
                    {section.heading && (
                      <Text className="text-base font-semibold text-foreground">
                        {section.heading}
                      </Text>
                    )}
                    <Text className="text-sm leading-relaxed text-muted-foreground">
                      {section.body}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default SystemDetailModal;
