import React from "react";
import "../styles/sideBar.css";

const icons = ["🏠", "🌍", "📞", "📅", "📊", "👤", "⚙️"];

const SideBar: React.FC = () => {
  return (
    <aside className="sidebar">
      {icons.map((icon, index) => (
        <div key={index} className="sidebar-icon">
          {icon}
        </div>
      ))}
    </aside>
  );
};

export default SideBar;
