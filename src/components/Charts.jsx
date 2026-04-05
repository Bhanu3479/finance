import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { LineChart, Line, XAxis, Tooltip } from "recharts";

export default function Charts() {
  const { transactions } = useContext(AppContext);

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

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3>Monthly Balance Trend</h3>

      <LineChart width={500} height={250} data={monthlyData}>
        <XAxis dataKey="month" />
        <Line type="monotone" dataKey="value" />
        <Tooltip />
      </LineChart>
    </div>
  );
}