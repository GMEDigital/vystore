'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products as initialProducts, Product, categories } from '@/data/products'

export default function AdminProducts() {
    const [productList, setProductList] = useState<Product[]>(initialProducts)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)

    const handleDelete = (id: string) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            setProductList(productList.filter(p => p.id !== id))
        }
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setIsFormOpen(true)
    }

    const handleAdd = () => {
        setEditingProduct(null)
        setIsFormOpen(true)
    }

    const handleSave = (product: Product) => {
        if (editingProduct) {
            setProductList(productList.map(p => p.id === product.id ? product : p))
        } else {
            setProductList([...productList, { ...product, id: `prod-${Date.now()}` }])
        }
        setIsFormOpen(false)
        setEditingProduct(null)
    }

    return (
        <div className="min-h-screen pb-8">
            {/* Title Bar */}
            <div className="border-b border-dark-700 bg-dark-900/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display font-bold text-xl text-white">Kelola Produk</h1>
                            <p className="text-sm text-dark-400">{productList.length} produk tersedia</p>
                        </div>
                        <button onClick={handleAdd} className="btn-primary text-sm">
                            + Tambah Produk
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid gap-4">
                    {productList.map((product) => (
                        <div key={product.id} className="glass-card p-4 flex items-center gap-4">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center text-2xl flex-shrink-0">
                                {product.category === 'streaming' && '🎬'}
                                {product.category === 'design' && '🎨'}
                                {product.category === 'education' && '📚'}
                                {product.category === 'games' && '🎮'}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-white truncate">{product.name}</h3>
                                <p className="text-sm text-dark-400">{product.duration} • Stok: {product.stock}</p>
                                <p className="text-primary-400 font-semibold">{formatPrice(product.price)}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="w-10 h-10 rounded-lg bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600 transition-colors flex items-center justify-center"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="w-10 h-10 rounded-lg bg-dark-700 text-dark-300 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Form Modal */}
            {isFormOpen && (
                <ProductFormModal
                    product={editingProduct}
                    onSave={handleSave}
                    onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
                />
            )}
        </div>
    )
}

interface ProductFormModalProps {
    product: Product | null
    onSave: (product: Product) => void
    onClose: () => void
}

function ProductFormModal({ product, onSave, onClose }: ProductFormModalProps) {
    const [formData, setFormData] = useState<Partial<Product>>(
        product || {
            name: '',
            description: '',
            price: 0,
            originalPrice: 0,
            category: 'streaming',
            duration: '1 Bulan',
            stock: 10,
            features: [],
            image: '',
        }
    )
    const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null)
    const [isDragging, setIsDragging] = useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleImageFile(file)
        }
    }

    const handleImageFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Mohon pilih file gambar yang valid (JPG, PNG, GIF, WebP)')
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            const result = reader.result as string
            setImagePreview(result)
            setFormData({ ...formData, image: result })
        }
        reader.readAsDataURL(file)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            handleImageFile(file)
        }
    }

    const removeImage = () => {
        setImagePreview(null)
        setFormData({ ...formData, image: '' })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData as Product)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" />

            <div
                className="relative w-full max-w-md glass-card p-6 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-white mb-6">
                    {product ? 'Edit Produk' : 'Tambah Produk'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-dark-300 mb-2">Nama Produk *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-dark-300 mb-2">Deskripsi *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input-field min-h-[80px]"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm text-dark-300 mb-2">Gambar Produk</label>
                        {imagePreview ? (
                            <div className="relative group">
                                <div className="w-full h-40 rounded-xl overflow-hidden bg-dark-800 border border-dark-700">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                                    <label className="cursor-pointer px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-lg transition-colors">
                                        Ganti
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label
                                className={`
                                    flex flex-col items-center justify-center w-full h-40 
                                    rounded-xl border-2 border-dashed cursor-pointer
                                    transition-all duration-200
                                    ${isDragging
                                        ? 'border-primary-400 bg-primary-500/10'
                                        : 'border-dark-600 hover:border-dark-500 bg-dark-800/50 hover:bg-dark-800'
                                    }
                                `}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center justify-center py-4">
                                    <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-dark-400 mb-1">
                                        <span className="text-primary-400">Klik untuk upload</span> atau drag & drop
                                    </p>
                                    <p className="text-xs text-dark-500">PNG, JPG, GIF, WebP (Maks. 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-dark-300 mb-2">Harga *</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-dark-300 mb-2">Harga Asli</label>
                            <input
                                type="number"
                                value={formData.originalPrice || ''}
                                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-dark-300 mb-2">Kategori *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="input-field"
                            >
                                {categories.filter(c => c.id !== 'all').map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-dark-300 mb-2">Durasi</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                placeholder="1 Bulan"
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-dark-300 mb-2">Stok *</label>
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                            className="input-field"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary">
                        {product ? 'Simpan Perubahan' : 'Tambah Produk'}
                    </button>
                </form>
            </div>
        </div>
    )
}
