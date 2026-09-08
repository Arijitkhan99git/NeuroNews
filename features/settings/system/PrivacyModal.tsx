import React from "react";
import { ModalProps } from "./modal-types";
import SystemDetailModal from "./SystemDetailModal";

const PrivacyModal = ({ isOpen, onClose }: ModalProps) => {
  return <SystemDetailModal type="privacy" isOpen={isOpen} onClose={onClose} />;
};

export default PrivacyModal;
