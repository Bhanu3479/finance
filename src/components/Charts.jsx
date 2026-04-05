import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Charts() {
  const { transactions } = useContext(AppContext);

  // 📈 MONTHLY DATA (LEFT)
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyData = months.map((month, index) => {
    const monthTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() === index;
    });

    const total = monthTransactions.reduce(
      (sum, t) => sum + (t.type === "income" ? t.amount : -t.amount),
      0
    );

    return { month, value: total };
  });

  // 🥧 EXPENSE DATA (RIGHT PIE)
  const expenseMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      expenseMap[t.category] =
        (expenseMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(expenseMap).map((key) => ({
    name: key,
    value: expenseMap[key],
  }));

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">

      {/* 📈 LEFT: LINE CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="mb-2">Monthly Balance Trend</h3>

        <LineChart width={400} height={250} data={monthlyData}>
          <XAxis dataKey="month" />
          <Line type="monotone" dataKey="value" stroke="#2563eb" />
          <Tooltip />
        </LineChart>
      </div>

      {/* 🥧 RIGHT: PIE CHART */}
      <div className="bg-white p-4 rounded shadow flex flex-col items-center">
        <h3 className="mb-2">Spending Analysis</h3>

        {pieData.length > 0 ? (
          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>No expense data</p>
        )}
      </div>

    </div>
  );
}
