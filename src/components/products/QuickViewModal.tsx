'use client'

import { Product } from '@/data/products'
import { formatPrice } from '@/lib/whatsapp'

interface QuickViewModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
    onAddToCart: (product: Product) => void
}

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) {
    if (!isOpen || !product) return null

    const isOutOfStock = product.stock === 0

    return (
        <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-lg glass-card p-6 animate-fade-in max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-600 transition-colors"
                >
                    ✕
                </button>

                {/* Product Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center text-3xl flex-shrink-0">
                        {product.category === 'streaming' && '🎬'}
                        {product.category === 'design' && '🎨'}
                        {product.category === 'education' && '📚'}
                        {product.category === 'games' && '🎮'}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">{product.name}</h2>
                        {product.duration && (
                            <span className="text-sm text-primary-400">{product.duration}</span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-dark-300 mb-6">{product.description}</p>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-white mb-3">Fitur:</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {product.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-dark-300">
                                    <span className="text-primary-500">✓</span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price */}
                <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700 mb-6">
                    <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-primary-400">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-base text-dark-500 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                    {product.originalPrice && (
                        <span className="text-sm text-green-400">
                            Hemat {formatPrice(product.originalPrice - product.price)} ({Math.round((1 - product.price / product.originalPrice) * 100)}%)
                        </span>
                    )}
                </div>

                {/* Stock Info */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-dark-400">
                        {isOutOfStock ? (
                            <span className="text-red-400">Stok Habis</span>
                        ) : (
                            <>Stok tersedia: <span className="text-white">{product.stock}</span></>
                        )}
                    </span>
                </div>

                {/* Add to Cart */}
                <button
                    onClick={() => {
                        onAddToCart(product)
                        onClose()
                    }}
                    disabled={isOutOfStock}
                    className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all ${isOutOfStock
                            ? 'bg-dark-700 text-dark-500 cursor-not-allowed'
                            : 'btn-primary'
                        }`}
                >
                    {isOutOfStock ? 'Stok Habis' : '+ Tambahkan ke Keranjang'}
                </button>
            </div>
        </div>
    )
}
