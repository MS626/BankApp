import React, { useEffect, useState } from "react";

import "../styles/miniHeader.css";
import MessageModal from "./Modal/mesageModal";

const MiniHeader: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <>
      <nav className="mini-header">
        <ul>
          <li className="active" onClick={() => setShowModal(false)}>
            Dia a dia
          </li>
          <li onClick={() => setShowModal(true)}>Contas</li>
          <li onClick={() => setShowModal(true)}>
            Movimentos <span className="badge">2</span>
          </li>
          <li onClick={() => setShowModal(true)}>Posição global</li>
          <li onClick={() => setShowModal(true)}>Para a sua Empresa</li>
        </ul>
      </nav>

      <MessageModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Funcionalidade em desenvolvimento"
        message="Esta funcionalidade ainda está em desenvolvimento"
        hideCloseButton={true}
      />
    </>
  );
};

export default MiniHeader;
