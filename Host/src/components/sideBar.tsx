import React from "react";
import "../styles/sideBar.css";

interface SideBarProps {
  isOpen: boolean;
}

const icons = ["🏠", "🌍", "📞", "📅", "📊", "👤", "⚙️"];

const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {icons.map((icon, index) => (
        <div key={index} className="sidebar-icon">
          {icon}
        </div>
      ))}
    </aside>
  );
};

export default SideBar;
