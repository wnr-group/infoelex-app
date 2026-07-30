import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Admin Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              InfoElex
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium">
              Admin Portal
            </span>
          </Link>
        </div>

        <nav className="flex items-center space-x-6 text-sm font-medium text-slate-300">
          <Link href="/admin" className="hover:text-blue-400 transition-colors">Overview</Link>
          <Link href="/admin/dashboard" className="hover:text-blue-400 transition-colors">Warehouse Dashboard</Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        InfoElex Internal Management System & Warehouse Operations
      </footer>
    </div>
  );
}
