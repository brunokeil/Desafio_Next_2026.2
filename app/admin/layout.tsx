import Link from 'next/link';
import { Package, Users, LayoutDashboard, Settings, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-neutral-950 text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 text-xl font-bold text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          Admin Panel
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-neutral-400 hover:text-white">
            <Users className="w-5 h-5" />
            Users
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-neutral-400 hover:text-white">
            <Package className="w-5 h-5" />
            Products
          </Link>
        </nav>
        
        <div className="mt-auto">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
