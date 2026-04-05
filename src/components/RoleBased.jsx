import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RoleBased() {
  const { transactions, setTransactions } = useContext(AppContext);

  const [role, setRole] = useState("viewer");

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });

  const addTransaction = () => {
    if (!newTransaction.date || !newTransaction.category || !newTransaction.amount) {
      alert("Fill all fields");
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...newTransaction,
      amount: Number(newTransaction.amount),
    };

    setTransactions([...transactions, newEntry]);

    setNewTransaction({
      date: "",
      category: "",
      amount: "",
      type: "expense",
    });
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Role-Based Access</h2>

      {/* Role Selector */}
      <select
        className="border p-2 mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

      <p className="mb-4">Current Role: {role}</p>

      {/* Admin Add Form */}
      {role === "admin" && (
        <div className="mb-4 space-x-2">
          <input
            type="date"
            className="border p-2"
            value={newTransaction.date}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, date: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-2"
            value={newTransaction.category}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, category: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            className="border p-2"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, amount: e.target.value })
            }
          />

          <select
            className="border p-2"
            value={newTransaction.type}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, type: e.target.value })
            }
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button
            onClick={addTransaction}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      )}

      {/* 🔥 IMPORTANT: SHOW TRANSACTIONS FOR BOTH */}
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
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <tr key={t.id} className="text-center border-t">
                <td>{t.date}</td>
                <td>{t.category}</td>
                <td>₹{t.amount}</td>
                <td
                  className={
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {t.type}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No transactions available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}