import React from "react";
import "../styles/miniHeader.css";

const MiniHeader: React.FC = () => {
  return (
    <nav className="mini-header">
      <ul>
        <li className="active">Dia a dia</li>
        <li>Contas</li>
        <li>
          Movimentos <span className="badge">2</span>
        </li>
        <li>Posição global</li>
        <li>Para a sua Empresa</li>
      </ul>
    </nav>
  );
};

export default MiniHeader;
