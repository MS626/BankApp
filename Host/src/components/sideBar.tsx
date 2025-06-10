import React, { useEffect, useState } from "react";
import MessageModal from "./Modal/mesageModal";
import "../styles/sideBar.css";

interface SideBarProps {
  isOpen: boolean;
}

const icons = ["🏠", "🌍", "📞", "📅", "📊", "👤", "⚙️"];

const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
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
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {icons.map((icon, index) => (
          <div
            key={index}
            className="sidebar-icon"
            onClick={() => setShowModal(true)}
          >
            {icon}
          </div>
        ))}
      </aside>

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

export default SideBar;
