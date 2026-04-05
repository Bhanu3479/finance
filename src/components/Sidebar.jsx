export default function Sidebar({ setPage }) {
  const menu = [
    { name: "Overview", key: "dashboard" },
    { name: "Transactions", key: "transactions" },
    { name: "Role-Based Access", key: "role" },
    { name: "Insights", key: "insights" },
  ];

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">FinanceDash</h1>

      <ul className="space-y-3">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => setPage(item.key)}
            className="cursor-pointer px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}