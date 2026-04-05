import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useContext(AppContext);

  // 🔹 Highest spending category
  const expenseTransactions = transactions.filter(
    (t) => t.type === "expense"
  );

  const categoryMap = {};

  expenseTransactions.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const highestCategory =
    Object.keys(categoryMap).length > 0
      ? Object.entries(categoryMap).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0]
      : "N/A";

  // 🔹 Total Income & Expense
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // 🔹 Simple insight
  const saving = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-3 gap-4">
      
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Top Spending Category</h3>
        <p>{highestCategory}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Total Income</h3>
        <p className="text-green-600">₹{totalIncome}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Total Expense</h3>
        <p className="text-red-600">₹{totalExpense}</p>
      </div>

      <div className="bg-white p-4 rounded shadow col-span-3">
        <h3 className="font-bold">Savings Insight</h3>
        <p>
          {saving >= 0
            ? `You are saving ₹${saving} this period 🎉`
            : `You are overspending by ₹${Math.abs(saving)} ⚠️`}
        </p>
      </div>

    </div>
  );
}