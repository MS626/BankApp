import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import SideBar from "./components/sideBar";
import SkeletonLoader from "./components/Skeleton/skeletonLoader";
import "./App.css";

const DashboardApp = lazy(() => import("companyDashboard/App"));
const UpdateApp = lazy(() => import("companyUpdateData/App"));

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <Header onToggleSidebar={toggleSidebar} />
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
      <div className="main-layout">
        <SideBar isOpen={sidebarOpen} />
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard/*" element={<DashboardApp />} />
            <Route path="/update/*" element={<UpdateApp />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
