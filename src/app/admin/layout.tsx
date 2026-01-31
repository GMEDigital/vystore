'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/orders', label: 'Pesanan', icon: '📦' },
    { href: '/admin/products', label: 'Produk', icon: '🛍️' },
    { href: '/admin/settings', label: 'Pengaturan', icon: '⚙️' },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-64 
                    bg-dark-900/95 backdrop-blur-xl border-r border-dark-700
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0
                `}
            >
                {/* Logo */}
                <div className="p-6 border-b border-dark-700">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20">
                            V
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-white">Vystore</h1>
                            <p className="text-xs text-dark-400">Admin Panel</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname.startsWith(item.href))

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-all duration-200
                                    ${isActive
                                        ? 'bg-primary-500/20 text-primary-400 shadow-lg shadow-primary-500/10'
                                        : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                                    }
                                `}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-400 hover:bg-dark-800 hover:text-white transition-all"
                    >
                        <span className="text-xl">🏠</span>
                        <span className="font-medium">Lihat Toko</span>
                    </Link>
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-2"
                    >
                        <span className="text-xl">🚪</span>
                        <span className="font-medium">Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="md:pl-64">
                {/* Top Bar for Mobile */}
                <header className="sticky top-0 z-30 glass-card border-b border-dark-700 rounded-none md:hidden">
                    <div className="flex items-center justify-between px-4 py-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                                V
                            </div>
                            <span className="font-display font-bold text-white">Admin</span>
                        </div>
                        <div className="w-10 h-10"></div>
                    </div>
                </header>

                {/* Page Content */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
