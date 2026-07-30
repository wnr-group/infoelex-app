import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">InfoElex Control Center</h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage electronics stock, monitor warehouse fulfillment, and oversee order dispatches.
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-colors shadow-md shadow-blue-600/20"
        >
          Open Warehouse Dashboard →
        </Link>
      </div>

      {/* Main Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
            ⚡
          </div>
          <h3 className="text-lg font-bold text-white">Electronics Catalog</h3>
          <p className="text-xs text-slate-400">Manage microcontrollers, sensors, ICs, and project hardware listings.</p>
          <div className="pt-2 text-sm text-blue-400 font-semibold cursor-pointer hover:underline">
            Manage 2,480 SKUs →
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
            🏭
          </div>
          <h3 className="text-lg font-bold text-white">Warehouse Logistics</h3>
          <p className="text-xs text-slate-400">Track storage bays, automated conveyor lines, and rack inventory status.</p>
          <div className="pt-2 text-sm text-teal-400 font-semibold cursor-pointer hover:underline">
            View 4 Active Zones →
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
            🚚
          </div>
          <h3 className="text-lg font-bold text-white">Fulfillment & Orders</h3>
          <p className="text-xs text-slate-400">Process incoming customer orders and assign robotic pickers.</p>
          <div className="pt-2 text-sm text-indigo-400 font-semibold cursor-pointer hover:underline">
            38 Orders Pending →
          </div>
        </div>
      </div>
    </div>
  );
}
