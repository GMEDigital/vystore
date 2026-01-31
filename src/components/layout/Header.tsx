'use client'

import Link from 'next/link'
import { useState } from 'react'

interface HeaderProps {
    cartItemCount: number
    onCartClick: () => void
    searchQuery?: string
    onSearch?: (query: string) => void
}

export default function Header({ cartItemCount, onCartClick, searchQuery = '', onSearch }: HeaderProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [localQuery, setLocalQuery] = useState(searchQuery)

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch?.(localQuery)
    }

    const handleSearchChange = (value: string) => {
        setLocalQuery(value)
        // Real-time search
        onSearch?.(value)
    }

    return (
        <header className="sticky top-0 z-30 glass-card border-b border-dark-700 rounded-none">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <span className="text-dark-900 font-bold text-lg">V</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="font-display font-bold text-lg text-white">Vystore</h1>
                            <p className="text-xs text-dark-400">Premium Digital Store</p>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={localQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                placeholder="Cari produk..."
                                className="w-full bg-dark-800/50 border border-dark-600 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                                🔍
                            </span>
                            {localQuery && (
                                <button
                                    type="button"
                                    onClick={() => handleSearchChange('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search Toggle - Mobile */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden w-10 h-10 rounded-xl bg-dark-800/50 border border-dark-600 flex items-center justify-center text-dark-400 hover:text-white hover:border-dark-500 transition-all"
                        >
                            🔍
                        </button>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-4">
                            <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
                                Home
                            </Link>
                            <a href="#products" className="text-dark-300 hover:text-white transition-colors text-sm">
                                Produk
                            </a>
                            <Link href="/admin" className="text-dark-300 hover:text-white transition-colors text-sm">
                                Admin
                            </Link>
                        </nav>

                        {/* Cart Button (Desktop) */}
                        <button
                            onClick={onCartClick}
                            className="hidden md:flex items-center gap-2 btn-secondary relative"
                        >
                            <span>🛒</span>
                            <span className="hidden lg:inline">Keranjang</span>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary-500 text-dark-900 text-xs font-bold flex items-center justify-center">
                                    {cartItemCount > 9 ? '9+' : cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <form onSubmit={handleSearchSubmit} className="md:hidden mt-4 animate-fade-in">
                        <div className="relative">
                            <input
                                type="text"
                                value={localQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                placeholder="Cari produk..."
                                autoFocus
                                className="w-full bg-dark-800/50 border border-dark-600 rounded-xl pl-10 pr-10 py-3 text-white placeholder:text-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                                🔍
                            </span>
                            {localQuery && (
                                <button
                                    type="button"
                                    onClick={() => handleSearchChange('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </header>
    )
}
