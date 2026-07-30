export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              InfoElex
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              Electronics & Warehouse
            </span>
          </div>

          <nav className="flex items-center space-x-6 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#electronics" className="hover:text-blue-400 transition-colors">Electronics</a>
            <a href="#warehouse" className="hover:text-blue-400 transition-colors">Warehouse Solutions</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-bold text-slate-200">InfoElex Solutions</span> — Electronics & Industrial Warehouse Supply
          </div>
          <div>
            © {new Date().getFullYear()} InfoElex. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
