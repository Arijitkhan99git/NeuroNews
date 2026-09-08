import React from "react";
import { ModalProps } from "./modal-types";
import SystemDetailModal from "./SystemDetailModal";

const AboutModal = ({ isOpen, onClose }: ModalProps) => {
  return <SystemDetailModal type="about" isOpen={isOpen} onClose={onClose} />;
};

export default AboutModal;
