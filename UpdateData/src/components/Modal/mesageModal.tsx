import React from "react";
import "../../styles/Modal/MessageModal.css";

interface Props {
  show: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  hideCloseButton?: boolean;
}

const MessageModal: React.FC<Props> = ({
  show,
  onClose,
  title,
  message,
  hideCloseButton,
}) => {
  if (!show) return null;

  return (
    <div className="dev-modal-backdrop">
      <div className="dev-modal-content">
        <h4>{title}</h4>
        <p>{message}</p>
        {!hideCloseButton && (
          <button className="dev-modal-button" onClick={onClose}>
            Fechar
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageModal;
