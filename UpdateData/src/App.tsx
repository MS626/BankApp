import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import InitialStep from "./components/Step 1/initialStep";
import UpdateDocuments from "./components/Step 2/UpdateDocuments/updateDocuments";
import PartnerData from "./components/Step 2/PartnerData/partnerData";
import Contacts from "./components/Step 2/Contacts/contacts";
import Documents from "./components/Step 3/documents";
import Conclusion from "./components/Step 4/conclusion";

import "./App.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="initialStep" />} />

      <Route path="initialStep" element={<InitialStep />} />
      <Route path="updateDocuments" element={<UpdateDocuments />} />
      <Route path="partnerData" element={<PartnerData />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="documents" element={<Documents />} />
      <Route path="conclusion" element={<Conclusion />} />
    </Routes>
  );
};

export default App;
