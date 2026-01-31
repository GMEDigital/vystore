'use client'

import Link from 'next/link'

export default function AdminDashboard() {
    // In real app, this would fetch from database
    const stats = {
        totalProducts: 12,
        pendingOrders: 5,
        completedOrders: 48,
        revenue: 2450000,
    }

    const recentOrders = [
        { id: 'ORD001', customer: 'John Doe', product: 'Netflix 1 Tahun', status: 'pending', amount: 299000 },
        { id: 'ORD002', customer: 'Jane Smith', product: 'Spotify 1 Tahun', status: 'lunas', amount: 120000 },
        { id: 'ORD003', customer: 'Ahmad', product: 'Canva Pro 1 Bulan', status: 'dikirim', amount: 25000 },
    ]

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            case 'lunas': return 'bg-green-500/20 text-green-400 border-green-500/30'
            case 'dikirim': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
            default: return 'bg-dark-700 text-dark-400'
        }
    }

    return (
        <div className="min-h-screen pb-8">
            <div className="container mx-auto px-4 py-6">

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass-card p-4">
                        <p className="text-dark-400 text-sm mb-1">Total Produk</p>
                        <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
                    </div>
                    <div className="glass-card p-4">
                        <p className="text-dark-400 text-sm mb-1">Order Pending</p>
                        <p className="text-2xl font-bold text-yellow-400">{stats.pendingOrders}</p>
                    </div>
                    <div className="glass-card p-4">
                        <p className="text-dark-400 text-sm mb-1">Order Selesai</p>
                        <p className="text-2xl font-bold text-green-400">{stats.completedOrders}</p>
                    </div>
                    <div className="glass-card p-4">
                        <p className="text-dark-400 text-sm mb-1">Total Revenue</p>
                        <p className="text-xl font-bold text-primary-400">{formatPrice(stats.revenue)}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <Link href="/admin/products" className="glass-card-hover p-4 text-center">
                        <span className="text-3xl mb-2 block">📦</span>
                        <p className="font-medium text-white">Kelola Produk</p>
                        <p className="text-xs text-dark-400">Tambah/Edit produk</p>
                    </Link>
                    <Link href="/admin/orders" className="glass-card-hover p-4 text-center">
                        <span className="text-3xl mb-2 block">📋</span>
                        <p className="font-medium text-white">Kelola Order</p>
                        <p className="text-xs text-dark-400">Lihat semua pesanan</p>
                    </Link>
                    <Link href="/admin/settings" className="glass-card-hover p-4 text-center">
                        <span className="text-3xl mb-2 block">⚙️</span>
                        <p className="font-medium text-white">Pengaturan</p>
                        <p className="text-xs text-dark-400">QRIS, rekening, WA</p>
                    </Link>
                </div>

                {/* Recent Orders */}
                <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-white">📋 Order Terbaru</h2>
                        <Link href="/admin/orders" className="text-primary-400 text-sm hover:text-primary-300">
                            Lihat Semua →
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-dark-400 text-sm border-b border-dark-700">
                                    <th className="pb-3 pr-4">ID</th>
                                    <th className="pb-3 pr-4">Customer</th>
                                    <th className="pb-3 pr-4">Produk</th>
                                    <th className="pb-3 pr-4">Status</th>
                                    <th className="pb-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-dark-700/50 last:border-0">
                                        <td className="py-3 pr-4 text-sm font-mono text-dark-300">{order.id}</td>
                                        <td className="py-3 pr-4 text-sm text-white">{order.customer}</td>
                                        <td className="py-3 pr-4 text-sm text-dark-300">{order.product}</td>
                                        <td className="py-3 pr-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-right text-sm font-medium text-primary-400">
                                            {formatPrice(order.amount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
