export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">InfoElex Warehouse Dashboard</h2>
          <p className="text-slate-400 text-sm">Real-time inventory levels, component stock, and warehouse operations.</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-300 font-medium">Warehouse Automation Online</span>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Electronics SKUs</span>
          <div className="text-3xl font-black text-white mt-2">2,480</div>
          <div className="text-xs text-emerald-400 mt-1">↑ 120 added this week</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Warehouse Capacity</span>
          <div className="text-3xl font-black text-white mt-2">78%</div>
          <div className="text-xs text-slate-400 mt-1">Zone A, B & C active</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Shipments</span>
          <div className="text-3xl font-black text-white mt-2">38</div>
          <div className="text-xs text-blue-400 mt-1">Ready for dispatch</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Alerts</span>
          <div className="text-3xl font-black text-amber-400 mt-2">5 SKUs</div>
          <div className="text-xs text-amber-400/80 mt-1 font-medium">Requires reorder</div>
        </div>
      </div>

      {/* Warehouse Stock & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Inventory Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">Electronics Stock Overview</h3>
            <span className="text-xs text-blue-400 hover:underline cursor-pointer">Full Inventory</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 text-xs uppercase">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Warehouse Bin</th>
                  <th className="py-3 px-4">In Stock</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">InfoElex Pro Micro V2</td>
                  <td className="py-3 px-4 text-slate-400">Microcontrollers</td>
                  <td className="py-3 px-4 text-slate-400">A-12-04</td>
                  <td className="py-3 px-4">340 pcs</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">In Stock</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Industrial IoT Sensor Kit</td>
                  <td className="py-3 px-4 text-slate-400">Sensors</td>
                  <td className="py-3 px-4 text-slate-400">B-04-11</td>
                  <td className="py-3 px-4">85 pcs</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">In Stock</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Dual Stepper Motor Driver</td>
                  <td className="py-3 px-4 text-slate-400">Robotics & Motors</td>
                  <td className="py-3 px-4 text-slate-400">C-01-09</td>
                  <td className="py-3 px-4">12 pcs</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">Low Stock</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">RFID Scanner Module</td>
                  <td className="py-3 px-4 text-slate-400">Warehouse Tools</td>
                  <td className="py-3 px-4 text-slate-400">A-08-02</td>
                  <td className="py-3 px-4">150 pcs</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">In Stock</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Warehouse Activity Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white text-lg">Live Dispatch Stream</h3>
          <div className="space-y-4 text-xs">
            <div className="border-l-2 border-blue-500 pl-3 py-1 space-y-0.5">
              <p className="text-slate-200 font-medium">Order #INF-9402 Dispatched</p>
              <p className="text-slate-400">10x Pro Micro V2 → Zone A Picker</p>
              <p className="text-slate-500 text-[10px]">3 mins ago</p>
            </div>

            <div className="border-l-2 border-teal-500 pl-3 py-1 space-y-0.5">
              <p className="text-slate-200 font-medium">Stock Restocked</p>
              <p className="text-slate-400">+500 RFID Scanner Modules → Bin A-08</p>
              <p className="text-slate-500 text-[10px]">25 mins ago</p>
            </div>

            <div className="border-l-2 border-indigo-500 pl-3 py-1 space-y-0.5">
              <p className="text-slate-200 font-medium">Conveyor Line Maintenance</p>
              <p className="text-slate-400">Zone B conveyor routine check completed</p>
              <p className="text-slate-500 text-[10px]">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
