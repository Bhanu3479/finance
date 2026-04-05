import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Transactions() {
  const { transactions } = useContext(AppContext);
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl mb-4">Transactions</h2>

      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} className="text-center border-t">
              <td>{t.date}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                {t.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}