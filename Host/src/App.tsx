import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import SideBar from "./components/sideBar";
import "./App.css";

const DashboardApp = lazy(() => import("companyDashboard/App"));
const UpdateApp = lazy(() => import("companyUpdateData/App"));

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-layout">
        <SideBar />
        <Suspense fallback={<div>Loading...</div>}>
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
