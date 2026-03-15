"use client";
import { useState, useEffect } from "react";

type Employee = { id: string; employeeId: string; name: string; email: string | null; phone: string | null; department: string | null; team: string | null; status: string; };
type Asset = { id: string; assetNumber: string; assetType: string | null; brand: string | null; model: string | null; status: string; employeeId: string | null; employee?: Employee | null; };

export default function Home() {
  const [tab, setTab] = useState("dashboard");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { loadData(); }, []);
  async function loadData() {
    setLoading(true);
    try { const [e, a] = await Promise.all([fetch("/api/employees"), fetch("/api/assets")]); setEmployees(await e.json()); setAssets(await a.json()); } catch {}
    setLoading(false);
  }

  const deps = [...new Set(employees.map(e => e.department).filter(Boolean))];
  const stats = { emp: employees.length, active: employees.filter(e => e.status === "在職").length, asset: assets.length, inUse: assets.filter(a => a.status === "在用").length };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-xl">載入中...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm p-4"><h1 className="text-2xl font-bold text-blue-600">資產管理系統</h1></header>
      <nav className="bg-white border-b flex gap-4 px-4">
        {[{id:"dashboard",l:"📊 儀表板"},{id:"employees",l:"👥 員工"},{id:"assets",l:"💻 設備"}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`py-3 px-4 ${tab===t.id ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}>{t.l}</button>
        ))}
      </nav>
      <main className="p-6">
        {tab==="dashboard" && (
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow"><div className="text-gray-500">員工總數</div><div className="text-3xl font-bold">{stats.emp}</div><div className="text-green-600">在職 {stats.active}</div></div>
            <div className="bg-white p-6 rounded-xl shadow"><div className="text-gray-500">設備總數</div><div className="text-3xl font-bold">{stats.asset}</div><div className="text-green-600">在用 {stats.inUse}</div></div>
            <div className="bg-white p-6 rounded-xl shadow col-span-2"><div className="font-semibold mb-2">單位分布</div><div className="flex flex-wrap gap-2">{deps.map(d => <span key={d} className="bg-blue-50 px-3 py-1 rounded">{d}</span>)}</div></div>
          </div>
        )}
        {tab==="employees" && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full"><thead className="bg-gray-50"><tr><th className="p-3 text-left">編號</th><th className="p-3 text-left">姓名</th><th className="p-3 text-left">單位</th><th className="p-3 text-left">狀態</th></tr></thead>
            <tbody>{employees.filter(e => e.name.includes(search)||e.employeeId.includes(search)).map(e => (<tr key={e.id} className="border-t hover:bg-gray-50"><td className="p-3">{e.employeeId}</td><td className="p-3 font-medium">{e.name}</td><td className="p-3">{e.department}</td><td className="p-3"><span className={`px-2 py-1 rounded text-xs ${e.status==="在職"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{e.status}</span></td></tr>))}</tbody>
            </table>
          </div>
        )}
        {tab==="assets" && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full"><thead className="bg-gray-50"><tr><th className="p-3 text-left">資產編號</th><th className="p-3 text-left">類型</th><th className="p-3 text-left">廠牌型號</th><th className="p-3 text-left">狀態</th></tr></thead>
            <tbody>{assets.filter(a => a.assetNumber.includes(search)||a.brand?.includes(search)).map(a => (<tr key={a.id} className="border-t hover:bg-gray-50"><td className="p-3">{a.assetNumber}</td><td className="p-3">{a.assetType}</td><td className="p-3">{a.brand} {a.model}</td><td className="p-3"><span className={`px-2 py-1 rounded text-xs ${a.status==="在用"?"bg-green-100 text-green-700":"bg-gray-100 text-gray-700"}`}>{a.status}</span></td></tr>))}</tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
