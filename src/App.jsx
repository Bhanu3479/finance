import { useState } from "react";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import RolePage from "./pages/RolePage";
import InsightsPage from "./pages/InsightsPage";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex">
      <Sidebar setPage={setPage} />

      <div className="p-6 w-full bg-gray-100 min-h-screen">
        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <TransactionsPage />}
        {page === "role" && <RolePage />}
        {page === "insights" && <InsightsPage />}
      </div>
    </div>
  );
}

export default App;