import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SummaryCards() {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded shadow">
        <h2>Total Balance</h2>
        <p className="text-xl font-bold">₹{balance}</p>
      </div>

      <div className="bg-white p-5 rounded shadow text-green-600">
        <h2>Total Income</h2>
        <p className="text-xl font-bold">₹{income}</p>
      </div>

      <div className="bg-white p-5 rounded shadow text-red-600">
        <h2>Total Expenses</h2>
        <p className="text-xl font-bold">₹{expense}</p>
      </div>
    </div>
  );
}