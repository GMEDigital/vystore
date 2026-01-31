'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Order {
    id: string
    customer: string
    email: string
    whatsapp: string
    products: { name: string; quantity: number; price: number }[]
    total: number
    paymentMethod: string
    status: 'pending' | 'lunas' | 'dikirim'
    createdAt: string
    accountDetails?: string
}

const initialOrders: Order[] = [
    {
        id: 'ORD001',
        customer: 'John Doe',
        email: 'john@example.com',
        whatsapp: '081234567890',
        products: [{ name: 'Netflix 1 Tahun', quantity: 1, price: 299000 }],
        total: 299000,
        paymentMethod: 'QRIS',
        status: 'pending',
        createdAt: '2024-01-30 14:30',
        accountDetails: 'Email: netflix@example.com\nPassword: Secure123!',
    },
    {
        id: 'ORD002',
        customer: 'Jane Smith',
        email: 'jane@example.com',
        whatsapp: '089876543210',
        products: [{ name: 'Spotify 1 Tahun', quantity: 1, price: 120000 }],
        total: 120000,
        paymentMethod: 'BCA',
        status: 'lunas',
        createdAt: '2024-01-30 12:15',
        accountDetails: 'Email: spotify@example.com\nPassword: Music456!',
    },
    {
        id: 'ORD003',
        customer: 'Ahmad',
        email: 'ahmad@example.com',
        whatsapp: '085555555555',
        products: [
            { name: 'Canva Pro 1 Bulan', quantity: 1, price: 25000 },
            { name: 'ChatGPT Plus 1 Bulan', quantity: 1, price: 85000 },
        ],
        total: 110000,
        paymentMethod: 'DANA',
        status: 'dikirim',
        createdAt: '2024-01-29 18:45',
        accountDetails: 'Canva: canva@example.com / Design123!\nChatGPT: gpt@example.com / AI789!',
    },
]

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>(initialOrders)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [copied, setCopied] = useState(false)

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            case 'lunas': return 'bg-green-500/20 text-green-400 border-green-500/30'
            case 'dikirim': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
            default: return 'bg-dark-700 text-dark-400'
        }
    }

    const updateStatus = (orderId: string, status: Order['status']) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o))
        if (selectedOrder?.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status })
        }
    }

    const copyAccountDetails = (details: string) => {
        navigator.clipboard.writeText(details)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen pb-8">
            {/* Title Bar */}
            <div className="border-b border-dark-700 bg-dark-900/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display font-bold text-xl text-white">Kelola Pesanan</h1>
                            <p className="text-sm text-dark-400">{orders.length} pesanan total</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor('pending')}`}>
                                {orders.filter(o => o.status === 'pending').length} Pending
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Order List */}
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="glass-card p-4 cursor-pointer hover:border-primary-500/30 transition-all"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-sm text-dark-400">{order.id}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="font-medium text-white">{order.customer}</p>
                                    <p className="text-sm text-dark-400">{order.whatsapp}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary-400">{formatPrice(order.total)}</p>
                                    <p className="text-xs text-dark-500">{order.createdAt}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {order.products.map((prod, idx) => (
                                    <span key={idx} className="px-2 py-1 rounded-lg bg-dark-800 text-xs text-dark-300">
                                        {prod.name} x{prod.quantity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
                    <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" />

                    <div
                        className="relative w-full max-w-lg glass-card p-6 max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-2 mb-6">
                            <span className="font-mono text-dark-400">{selectedOrder.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                                {selectedOrder.status}
                            </span>
                        </div>

                        {/* Customer Info */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-dark-400 mb-2">👤 Customer</h3>
                            <div className="bg-dark-800/50 p-4 rounded-xl space-y-2">
                                <p className="text-white">{selectedOrder.customer}</p>
                                <p className="text-dark-400 text-sm">{selectedOrder.email}</p>
                                <p className="text-dark-400 text-sm">{selectedOrder.whatsapp}</p>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-dark-400 mb-2">📦 Produk</h3>
                            <div className="bg-dark-800/50 p-4 rounded-xl space-y-2">
                                {selectedOrder.products.map((prod, idx) => (
                                    <div key={idx} className="flex justify-between">
                                        <span className="text-white">{prod.name} x{prod.quantity}</span>
                                        <span className="text-primary-400">{formatPrice(prod.price * prod.quantity)}</span>
                                    </div>
                                ))}
                                <div className="pt-2 mt-2 border-t border-dark-700 flex justify-between font-semibold">
                                    <span className="text-white">Total</span>
                                    <span className="text-primary-400">{formatPrice(selectedOrder.total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-dark-400 mb-2">💳 Pembayaran</h3>
                            <div className="bg-dark-800/50 p-4 rounded-xl">
                                <p className="text-white">{selectedOrder.paymentMethod}</p>
                            </div>
                        </div>

                        {/* Account Details */}
                        {selectedOrder.accountDetails && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-dark-400 mb-2">🔑 Detail Akun</h3>
                                <div className="bg-dark-800/50 p-4 rounded-xl">
                                    <pre className="text-sm text-white whitespace-pre-wrap font-mono">{selectedOrder.accountDetails}</pre>
                                    <button
                                        onClick={() => copyAccountDetails(selectedOrder.accountDetails!)}
                                        className="mt-3 px-4 py-2 rounded-lg bg-dark-700 text-sm text-dark-300 hover:text-white transition-colors w-full"
                                    >
                                        {copied ? '✓ Copied!' : '📋 Copy Detail Akun'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Status Actions */}
                        <div>
                            <h3 className="text-sm font-semibold text-dark-400 mb-2">⚡ Update Status</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateStatus(selectedOrder.id, 'pending')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${selectedOrder.status === 'pending'
                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                        : 'bg-dark-800 text-dark-400 hover:text-white'
                                        }`}
                                >
                                    Pending
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedOrder.id, 'lunas')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${selectedOrder.status === 'lunas'
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-dark-800 text-dark-400 hover:text-white'
                                        }`}
                                >
                                    Lunas
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedOrder.id, 'dikirim')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${selectedOrder.status === 'dikirim'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                        : 'bg-dark-800 text-dark-400 hover:text-white'
                                        }`}
                                >
                                    Dikirim
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
