import React from "react";
import "../../styles/Modal/DevelopmentModal.css";

interface Props {
  show: boolean;
  onClose: () => void;
}

const DevelopmentModal: React.FC<Props> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="dev-modal-backdrop">
      <div className="dev-modal-content">
        <h4>Funcionalidade em desenvolvimento</h4>
        <p>Esta funcionalidade ainda não está disponível.</p>
        <button className="dev-modal-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default DevelopmentModal;
