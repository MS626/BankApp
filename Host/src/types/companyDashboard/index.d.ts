declare module "#not-for-import/companyDashboard/store/store" {
    const useMovementsStore: any;
    export default useMovementsStore;
}
declare module "#not-for-import/companyDashboard/components/miniHeader" {
    import React from "react";
    import "../styles/miniHeader.css";
    const MiniHeader: React.FC;
    export default MiniHeader;
}
declare module "#not-for-import/companyDashboard/components/homePage" {
    import React from "react";
    import "../styles/homePage.css";
    const HomePage: React.FC;
    export default HomePage;
}
declare module "companyDashboard/App" {
    import React from "react";
    import "./App.css";
    const App: React.FC;
    export default App;
}
