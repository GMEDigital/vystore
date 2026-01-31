'use client'

import Link from 'next/link'

interface HeaderProps {
    cartItemCount: number
    onCartClick: () => void
}

export default function Header({ cartItemCount, onCartClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 glass-card border-b border-dark-700 rounded-none">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <span className="text-dark-900 font-bold text-lg">V</span>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg text-white">Vystore</h1>
                            <p className="text-xs text-dark-400">Premium Digital Store</p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-dark-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <a href="#products" className="text-dark-300 hover:text-white transition-colors">
                            Produk
                        </a>
                        <Link href="/admin" className="text-dark-300 hover:text-white transition-colors">
                            Admin
                        </Link>
                    </nav>

                    {/* Cart Button (Desktop) */}
                    <button
                        onClick={onCartClick}
                        className="hidden md:flex items-center gap-2 btn-secondary relative"
                    >
                        <span>🛒</span>
                        <span>Keranjang</span>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary-500 text-dark-900 text-xs font-bold flex items-center justify-center">
                                {cartItemCount > 9 ? '9+' : cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}
