'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface MobileNavProps {
    cartItemCount: number
    onCartClick: () => void
}

export default function MobileNav({ cartItemCount, onCartClick }: MobileNavProps) {
    const pathname = usePathname()
    const [activeItem, setActiveItem] = useState<number | null>(null)

    const navItems = [
        { href: '/', icon: '🏠', label: 'Home' },
        { href: '/#products', icon: '📦', label: 'Produk', isHash: true },
        { onClick: onCartClick, icon: '🛒', label: 'Keranjang', badge: cartItemCount },
        { href: '/admin', icon: '⚙️', label: 'Admin' },
    ]

    const handleTap = (idx: number) => {
        setActiveItem(idx)
        setTimeout(() => setActiveItem(null), 150)
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-bottom">
            <div className="glass-card rounded-t-2xl border-t border-dark-700 px-2 py-3">
                <div className="flex items-center justify-around">
                    {navItems.map((item, idx) => {
                        const isActive = item.href === pathname
                        const isTapped = activeItem === idx

                        // Base classes for all nav items with larger touch targets (min 44px)
                        const baseClasses = `
                            relative flex flex-col items-center gap-1 
                            min-w-[60px] min-h-[48px] py-2 px-4 rounded-xl 
                            transition-all duration-200 ease-out
                            touch-manipulation
                            ${isActive ? 'text-primary-400 bg-primary-500/10' : 'text-dark-400 hover:bg-dark-800/50 active:bg-dark-700'}
                            ${isTapped ? 'scale-90' : 'scale-100'}
                        `

                        if (item.onClick) {
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        handleTap(idx)
                                        item.onClick!()
                                    }}
                                    className={baseClasses}
                                >
                                    <span className={`text-2xl transition-transform ${isTapped ? 'scale-110' : ''}`}>
                                        {item.icon}
                                    </span>
                                    <span className={`text-xs font-medium ${isActive ? 'text-primary-400' : 'text-dark-400'}`}>
                                        {item.label}
                                    </span>
                                    {item.badge !== undefined && item.badge > 0 && (
                                        <span className="absolute -top-0.5 right-1 min-w-[20px] h-5 rounded-full bg-primary-500 text-dark-900 text-xs font-bold flex items-center justify-center px-1 shadow-lg shadow-primary-500/30 animate-bounce">
                                            {item.badge > 9 ? '9+' : item.badge}
                                        </span>
                                    )}
                                </button>
                            )
                        }

                        if (item.isHash) {
                            return (
                                <a
                                    key={idx}
                                    href={item.href}
                                    onClick={() => handleTap(idx)}
                                    className={baseClasses}
                                >
                                    <span className={`text-2xl transition-transform ${isTapped ? 'scale-110' : ''}`}>
                                        {item.icon}
                                    </span>
                                    <span className={`text-xs font-medium ${isActive ? 'text-primary-400' : 'text-dark-400'}`}>
                                        {item.label}
                                    </span>
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary-400" />
                                    )}
                                </a>
                            )
                        }

                        return (
                            <Link
                                key={idx}
                                href={item.href!}
                                onClick={() => handleTap(idx)}
                                className={baseClasses}
                            >
                                <span className={`text-2xl transition-transform ${isTapped ? 'scale-110' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-xs font-medium ${isActive ? 'text-primary-400' : 'text-dark-400'}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary-400" />
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
