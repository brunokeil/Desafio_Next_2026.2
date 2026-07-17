import { prisma } from "@/lib/prisma"
import { Users, Package, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const usersCount = await prisma.user.count()
  const productsCount = await prisma.product.count()

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-neutral-400 mt-2">Welcome back to the admin control panel.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/users" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all group shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white tracking-tight">{usersCount}</h3>
          <p className="text-neutral-400 font-medium mt-1">Total Users</p>
        </Link>
        
        <Link href="/admin/products" className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all group shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white tracking-tight">{productsCount}</h3>
          <p className="text-neutral-400 font-medium mt-1">Total Products</p>
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white tracking-tight">100%</h3>
          <p className="text-neutral-400 font-medium mt-1">System Health</p>
        </div>
      </div>
    </div>
  )
}
