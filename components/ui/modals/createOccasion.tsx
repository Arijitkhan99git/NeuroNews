import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CreateOccasionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function CreateOccasion({
  visible,
  onClose,
  onSubmit,
}: CreateOccasionModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Blur replaced with a semi-transparent overlay (expo-blur version mismatch with Expo Go) */}
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}>
          <Pressable
            className="modal-overlay"
            onPress={handleClose}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Pressable
              className="modal-container"
              onPress={(e) => e.stopPropagation()}
            >
              <View className="modal-header">
                <Text className="modal-title">New Subscription</Text>
                <Pressable className="modal-close" onPress={handleClose}>
                  <Text className="modal-close-text">✕</Text>
                </Pressable>
              </View>

              {/* KeyboardAwareScrollView replaced with ScrollView (keyboard-controller needs a dev build) */}
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  padding: 20,
                  gap: 20,
                }}
              >
                <View>
                  <Text>Hi There</Text>
                </View>
              </ScrollView>
            </Pressable>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default CreateOccasion;
