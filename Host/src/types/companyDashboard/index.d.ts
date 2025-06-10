declare module "#not-for-import/companyDashboard/store/store" {
    const useMovementsStore: any;
    export default useMovementsStore;
}
declare module "#not-for-import/companyDashboard/components/Modal/mesageModal" {
    import React from "react";
    import "../../styles/Modal/MessageModal.css";
    interface Props {
        show: boolean;
        onClose: () => void;
        title?: string;
        message?: string;
        hideCloseButton?: boolean;
    }
    const MessageModal: React.FC<Props>;
    export default MessageModal;
}
declare module "#not-for-import/companyDashboard/components/miniHeader" {
    import React from "react";
    import "../styles/miniHeader.css";
    const MiniHeader: React.FC;
    export default MiniHeader;
}
declare module "#not-for-import/companyDashboard/components/Hook/useSummary" {
    interface AccountSummary {
        account: {
            bankName: string;
            bankId: string;
            availableBalance: string;
            bookBalance: string;
        };
        entries: {
            today: string;
            thisMonth: string;
        };
        exits: {
            today: string;
            thisMonth: string;
        };
    }
    export const useAccountSummary: () => {
        summary: AccountSummary | null;
    };
}
declare module "#not-for-import/companyDashboard/components/homePage" {
    import React from "react";
    import "../styles/homepage.css";
    const HomePage: React.FC;
    export default HomePage;
}
declare module "companyDashboard/App" {
    import React from "react";
    import "./App.css";
    const App: React.FC;
    export default App;
}
