export default function CustomerPage() {
  return (
    <div className="space-y-16 py-8 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section id="hero" className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-8 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="max-w-2xl space-y-6">
          <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Smart Electronics & Industrial Supply
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Powering Next-Gen <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Electronics & Warehouses</span>
          </h1>
          <p className="text-slate-300 text-lg">
            InfoElex is your trusted supplier for high-grade electronic components, IoT hardware, and modern automated warehouse equipment.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#electronics"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-lg shadow-blue-600/30 transition-all"
            >
              Browse Electronics
            </a>
            <a
              href="#warehouse"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium rounded-lg transition-all"
            >
              Warehouse Equipment
            </a>
          </div>
        </div>
      </section>

      {/* Featured Electronics Products */}
      <section id="electronics" className="space-y-6">
        <div className="flex justify-between items-end border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Electronic Projects & Components</h2>
            <p className="text-slate-400 text-sm">Hardware, microcontrollers, sensors & electronic modules.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-full h-36 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 font-medium mb-4">
                [Microcontroller Board]
              </div>
              <h3 className="font-semibold text-white text-lg">InfoElex Pro Micro V2</h3>
              <p className="text-slate-400 text-xs mt-1">High-performance ARM Cortex controller for automation projects.</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-blue-400 font-bold text-lg">$24.99</span>
              <button className="px-3 py-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-md text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-full h-36 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 font-medium mb-4">
                [Sensor Pack]
              </div>
              <h3 className="font-semibold text-white text-lg">Industrial IoT Sensor Kit</h3>
              <p className="text-slate-400 text-xs mt-1">Multi-sensor node for temperature, humidity & vibration tracking.</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-blue-400 font-bold text-lg">$49.50</span>
              <button className="px-3 py-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-md text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-full h-36 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 font-medium mb-4">
                [Motor Driver]
              </div>
              <h3 className="font-semibold text-white text-lg">Dual Stepper Motor Driver</h3>
              <p className="text-slate-400 text-xs mt-1">High-torque motor controller module for robotic projects.</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-blue-400 font-bold text-lg">$18.25</span>
              <button className="px-3 py-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-md text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-full h-36 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 font-medium mb-4">
                [Power Module]
              </div>
              <h3 className="font-semibold text-white text-lg">Regulated Power Supply 12V</h3>
              <p className="text-slate-400 text-xs mt-1">Surge-protected power supply module for electronics testing.</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-blue-400 font-bold text-lg">$32.00</span>
              <button className="px-3 py-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-md text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse Solutions & Supplies */}
      <section id="warehouse" className="space-y-6">
        <div className="flex justify-between items-end border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Warehouse & Logistics Supplies</h2>
            <p className="text-slate-400 text-sm">Industrial scanners, storage systems, and automated warehouse gear.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-xl space-y-3">
            <div className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-xl font-bold">
              📦
            </div>
            <h3 className="text-lg font-bold text-white">Automated Storage Racks</h3>
            <p className="text-slate-400 text-sm">Heavy-duty modular racking units designed for rapid electronic inventory handling.</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-xl space-y-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl font-bold">
              🏷️
            </div>
            <h3 className="text-lg font-bold text-white">Barcode & RFID Scanners</h3>
            <p className="text-slate-400 text-sm">Long-range wireless barcode scanners engineered for warehouse stock tracking.</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-xl space-y-3">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl font-bold">
              🚚
            </div>
            <h3 className="text-lg font-bold text-white">Conveyor Belt Systems</h3>
            <p className="text-slate-400 text-sm">Smart motorized conveyor sections with automated sorting controllers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
