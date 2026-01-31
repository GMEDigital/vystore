'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
    { href: '/admin', icon: '📊', label: 'Dashboard', exact: true },
    { href: '/admin/orders', icon: '📋', label: 'Pesanan' },
    { href: '/admin/products', icon: '📦', label: 'Produk' },
    { href: '/admin/settings', icon: '⚙️', label: 'Pengaturan' },
]

interface AdminSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname()

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href
        return pathname.startsWith(href)
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-64 
                    glass-card rounded-none border-r border-dark-700
                    transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0 lg:static lg:z-auto
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 p-6 border-b border-dark-700">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <span className="text-dark-900 font-bold text-lg">V</span>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg text-white">Vystore</h1>
                            <p className="text-xs text-dark-400">Admin Panel</p>
                        </div>
                    </Link>

                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="ml-auto lg:hidden w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl
                                transition-all duration-200
                                ${isActive(item.href, item.exact)
                                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
                                    : 'text-dark-300 hover:text-white hover:bg-dark-800/50'
                                }
                            `}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                            {isActive(item.href, item.exact) && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-primary-500" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800/50 transition-all"
                    >
                        <span className="text-xl">🏠</span>
                        <span className="font-medium">Kembali ke Toko</span>
                    </Link>
                </div>
            </aside>
        </>
    )
}
