'use client'

import { useState, useRef, useEffect } from 'react'
import { CartItem } from '@/hooks/useCart'
import { formatPrice } from '@/lib/whatsapp'
import Link from 'next/link'

interface CartDrawerProps {
    items: CartItem[]
    isOpen: boolean
    onClose: () => void
    onUpdateQuantity: (productId: string, quantity: number) => void
    onRemove: (productId: string) => void
    total: number
}

export default function CartDrawer({
    items,
    isOpen,
    onClose,
    onUpdateQuantity,
    onRemove,
    total
}: CartDrawerProps) {
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const startY = useRef(0)
    const drawerRef = useRef<HTMLDivElement>(null)

    // Reset drag offset when drawer opens
    useEffect(() => {
        if (isOpen) {
            setDragOffset(0)
        }
    }, [isOpen])

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY
        setIsDragging(true)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        const currentY = e.touches[0].clientY
        const diff = currentY - startY.current
        // Only allow dragging down (positive diff)
        if (diff > 0) {
            setDragOffset(diff)
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
        // If dragged more than 100px down, close the drawer
        if (dragOffset > 100) {
            onClose()
        }
        setDragOffset(0)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50" onClick={onClose}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: 1 - (dragOffset / 300) }}
            />

            {/* Drawer - Full screen on mobile */}
            <div
                ref={drawerRef}
                className="absolute right-0 top-0 h-full w-full md:max-w-md glass-card md:rounded-l-2xl flex flex-col animate-slide-in-right touch-pan-y"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `translateY(${dragOffset}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
            >
                {/* Swipe Indicator (mobile only) */}
                <div className="md:hidden flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-dark-600" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-dark-700">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        🛒 Keranjang
                        <span className="text-sm font-normal text-dark-400">({items.length} item)</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-600 transition-colors active:scale-95"
                    >
                        ✕
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 overscroll-contain">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-dark-400">
                            <span className="text-6xl mb-4">🛒</span>
                            <p className="text-center text-lg">Keranjang masih kosong</p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-6 py-3 rounded-xl bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors font-medium"
                            >
                                Mulai Belanja →
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-dark-800/50 rounded-xl p-4 border border-dark-700 active:scale-98 transition-transform">
                                    <div className="flex gap-4">
                                        {/* Product Icon - larger for touch */}
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center text-2xl flex-shrink-0">
                                            {item.category === 'streaming' && '🎬'}
                                            {item.category === 'design' && '🎨'}
                                            {item.category === 'education' && '📚'}
                                            {item.category === 'games' && '🎮'}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-white text-sm truncate">{item.name}</h3>
                                            {item.duration && (
                                                <span className="text-xs text-dark-400">{item.duration}</span>
                                            )}
                                            <div className="mt-1 text-primary-400 font-semibold">
                                                {formatPrice(item.price)}
                                            </div>
                                        </div>

                                        {/* Remove - larger touch target */}
                                        <button
                                            onClick={() => onRemove(item.id)}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-dark-500 hover:text-red-400 hover:bg-red-500/10 transition-all active:scale-95"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    {/* Quantity - improved touch controls */}
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-700">
                                        <span className="text-sm text-dark-400">Jumlah:</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                className="w-10 h-10 rounded-xl bg-dark-700 text-white hover:bg-dark-600 transition-colors flex items-center justify-center text-xl font-bold active:scale-95"
                                            >
                                                −
                                            </button>
                                            <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, Math.min(item.quantity + 1, item.stock))}
                                                disabled={item.quantity >= item.stock}
                                                className="w-10 h-10 rounded-xl bg-dark-700 text-white hover:bg-dark-600 transition-colors flex items-center justify-center text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - sticky at bottom with safe area */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-dark-700 space-y-4 bg-dark-900/95 backdrop-blur-sm safe-bottom">
                        {/* Total */}
                        <div className="flex items-center justify-between">
                            <span className="text-dark-400">Total:</span>
                            <span className="text-2xl font-bold text-primary-400">{formatPrice(total)}</span>
                        </div>

                        {/* Checkout Button - larger for mobile */}
                        <Link
                            href="/checkout"
                            className="block w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center font-bold text-lg shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all active:scale-98"
                            onClick={onClose}
                        >
                            Checkout Sekarang →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
