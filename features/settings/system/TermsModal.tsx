import React from "react";
import { Text, View } from "react-native";
import { ModalProps } from "./modal-types";

const TermsModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <View>
      <Text>TermsModal</Text>
    </View>
  );
};

export default TermsModal;
