import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl mb-4">Dashboard Overview</h1>
      <SummaryCards />
      <Charts />
    </div>
  );
}