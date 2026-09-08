import React from "react";
import { Text, View } from "react-native";
import { ModalProps } from "./modal-types";

const PrivacyModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <View>
      <Text>PrivacyModal</Text>
    </View>
  );
};

export default PrivacyModal;
