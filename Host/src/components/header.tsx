import React from "react";
import "../styles/header.css";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          ☰
        </button>
        <span className="emoji">🏦</span>
        <div className="space-between-rigth"></div>
        <span className="bank-name">ITSector, Lda</span>
      </div>
      <div className="header-right">
        <span className="emoji">👤</span>
        <span className="user-name">Miguel Santos</span>
      </div>
    </header>
  );
};

export default Header;
