import React from "react";
import { ModalProps } from "./modal-types";
import SystemDetailModal from "./SystemDetailModal";

const TermsModal = ({ isOpen, onClose }: ModalProps) => {
  return <SystemDetailModal type="terms" isOpen={isOpen} onClose={onClose} />;
};

export default TermsModal;
