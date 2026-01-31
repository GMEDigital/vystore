'use client'

import { useState, useMemo } from 'react'
import { products, Product } from '@/data/products'
import { useCart } from '@/hooks/useCart'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import CategoryFilter from '@/components/products/CategoryFilter'
import ProductCard from '@/components/products/ProductCard'
import QuickViewModal from '@/components/products/QuickViewModal'
import CartDrawer from '@/components/cart/CartDrawer'

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
    const cart = useCart()

    const filteredProducts = useMemo(() => {
        let result = products

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory)
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim()
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            )
        }

        return result
    }, [selectedCategory, searchQuery])

    return (
        <div className="min-h-screen">
            <Header
                cartItemCount={cart.itemCount}
                onCartClick={() => cart.setIsOpen(true)}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
            />

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-8 md:py-16">
                <div className="text-center max-w-2xl mx-auto animate-fade-in">
                    <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Premium</span>{' '}
                        <span className="text-gradient">Digital Store</span>
                    </h1>
                    <p className="text-dark-300 text-lg mb-6">
                        Akun premium berkualitas dengan harga terjangkau. Netflix, Spotify, Canva, dan lainnya.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <div className="flex items-center gap-2 text-sm text-dark-300">
                            <span className="text-primary-500">✓</span> Garansi Full
                        </div>
                        <div className="flex items-center gap-2 text-sm text-dark-300">
                            <span className="text-primary-500">✓</span> Proses Instan
                        </div>
                        <div className="flex items-center gap-2 text-sm text-dark-300">
                            <span className="text-primary-500">✓</span> Support 24/7
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="container mx-auto px-4 pb-24">
                <div className="mb-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4">Pilih Kategori</h2>
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={cart.addToCart}
                            onQuickView={setQuickViewProduct}
                        />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-dark-400">
                        <p className="text-4xl mb-4">📦</p>
                        <p>Tidak ada produk dalam kategori ini</p>
                    </div>
                )}
            </section>

            {/* Modals */}
            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
                onAddToCart={cart.addToCart}
            />

            <CartDrawer
                items={cart.items}
                isOpen={cart.isOpen}
                onClose={() => cart.setIsOpen(false)}
                onUpdateQuantity={cart.updateQuantity}
                onRemove={cart.removeFromCart}
                total={cart.total}
            />

            {/* Footer - hidden on mobile */}
            <div className="hidden md:block">
                <Footer />
            </div>

            <MobileNav
                cartItemCount={cart.itemCount}
                onCartClick={() => cart.setIsOpen(true)}
            />
        </div>
    )
}
