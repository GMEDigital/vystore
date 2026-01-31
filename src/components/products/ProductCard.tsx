'use client'

import { Product } from '@/data/products'
import { formatPrice } from '@/lib/whatsapp'

interface ProductCardProps {
    product: Product
    onAddToCart: (product: Product) => void
    onQuickView: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
    const isOutOfStock = product.stock === 0

    const getBadgeClass = () => {
        switch (product.badge) {
            case 'bestseller':
                return 'badge-bestseller'
            case 'promo':
                return 'badge-promo'
            case 'outofstock':
                return 'badge-outofstock'
            default:
                return ''
        }
    }

    const getBadgeText = () => {
        switch (product.badge) {
            case 'bestseller':
                return '🔥 Terlaris'
            case 'promo':
                return '💰 Promo'
            case 'outofstock':
                return '❌ Stok Habis'
            default:
                return ''
        }
    }

    return (
        <div className="glass-card-hover p-4 flex flex-col h-full group">
            {/* Badge */}
            {product.badge && (
                <div className="mb-3">
                    <span className={getBadgeClass()}>{getBadgeText()}</span>
                </div>
            )}

            {/* Product Image */}
            <div
                className="relative w-full h-32 mb-4 flex items-center justify-center cursor-pointer"
                onClick={() => onQuickView(product)}
            >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    {product.category === 'streaming' && '🎬'}
                    {product.category === 'design' && '🎨'}
                    {product.category === 'education' && '📚'}
                    {product.category === 'games' && '🎮'}
                </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col">
                <h3
                    className="font-semibold text-white text-sm mb-1 line-clamp-2 cursor-pointer hover:text-primary-400 transition-colors"
                    onClick={() => onQuickView(product)}
                >
                    {product.name}
                </h3>

                {product.duration && (
                    <span className="text-xs text-dark-400 mb-2">{product.duration}</span>
                )}

                <p className="text-xs text-dark-400 line-clamp-2 mb-3 flex-1">
                    {product.description}
                </p>

                {/* Price */}
                <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary-400">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-dark-500 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                    {product.originalPrice && (
                        <span className="text-xs text-green-400">
                            Hemat {Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={() => onAddToCart(product)}
                    disabled={isOutOfStock}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${isOutOfStock
                            ? 'bg-dark-700 text-dark-500 cursor-not-allowed'
                            : 'btn-primary'
                        }`}
                >
                    {isOutOfStock ? 'Stok Habis' : '+ Keranjang'}
                </button>
            </div>
        </div>
    )
}
