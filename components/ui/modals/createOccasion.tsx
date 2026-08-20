import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

interface CreateOccasionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CreateOccasion = ({
  visible,
  onClose,
  onSubmit,
}: CreateOccasionModalProps) => {
  const handleClose = () => {};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView className="flex-1">
        <BlurView intensity={30} tint="dark" style={{ flex: 1 }}>
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
                  <Text className="modal-close-text">x</Text>
                </Pressable>
              </View>

              <KeyboardAwareScrollView
                bottomOffset={20}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  padding: 20,
                  gap: 20,
                }}
              >
                <View>
                  <Text>Hi There</Text>
                </View>
              </KeyboardAwareScrollView>
            </Pressable>
          </Pressable>
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
};

export default CreateOccasion;
