'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartItem } from '@/hooks/useCart'
import { formatPrice, generateWhatsAppLink, CustomerData } from '@/lib/whatsapp'

const CART_KEY = 'vystore_cart'

const paymentMethods = [
    { id: 'qris', name: 'QRIS', icon: '📱', desc: 'Scan & bayar instant' },
    { id: 'bca', name: 'BCA', icon: '🏦', desc: 'Transfer Bank BCA' },
    { id: 'mandiri', name: 'Mandiri', icon: '🏦', desc: 'Transfer Bank Mandiri' },
    { id: 'bri', name: 'BRI', icon: '🏦', desc: 'Transfer Bank BRI' },
    { id: 'dana', name: 'DANA', icon: '💳', desc: 'E-Wallet DANA' },
    { id: 'ovo', name: 'OVO', icon: '💳', desc: 'E-Wallet OVO' },
    { id: 'gopay', name: 'GoPay', icon: '💳', desc: 'E-Wallet GoPay' },
]

export default function CheckoutPage() {
    const router = useRouter()
    const [items, setItems] = useState<CartItem[]>([])
    const [customer, setCustomer] = useState<CustomerData>({ name: '', email: '', whatsapp: '' })
    const [selectedPayment, setSelectedPayment] = useState('qris')
    const [isLoading, setIsLoading] = useState(true)

    // Load cart from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(CART_KEY)
        if (saved) {
            try {
                const cartItems = JSON.parse(saved)
                if (cartItems.length === 0) {
                    router.push('/')
                } else {
                    setItems(cartItems)
                }
            } catch (e) {
                router.push('/')
            }
        } else {
            router.push('/')
        }
        setIsLoading(false)
    }, [router])

    const total = useMemo(() =>
        items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        , [items])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!customer.name || !customer.whatsapp) {
            alert('Mohon lengkapi nama dan nomor WhatsApp')
            return
        }

        const paymentMethodName = paymentMethods.find(p => p.id === selectedPayment)?.name || 'QRIS'
        const waLink = generateWhatsAppLink(items, customer, paymentMethodName)

        // Open WhatsApp
        window.open(waLink, '_blank')

        // Navigate to payment page
        router.push(`/payment?method=${selectedPayment}`)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-dark-400">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-8">
            {/* Header */}
            <header className="sticky top-0 z-30 glass-card border-b border-dark-700 rounded-none">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white transition-colors"
                        >
                            ←
                        </Link>
                        <div>
                            <h1 className="font-display font-bold text-lg text-white">Checkout</h1>
                            <p className="text-xs text-dark-400">{items.length} item</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">

                    {/* Order Summary */}
                    <div className="glass-card p-4">
                        <h2 className="font-semibold text-white mb-4">📦 Pesanan Anda</h2>
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-dark-700 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">
                                            {item.category === 'streaming' && '🎬'}
                                            {item.category === 'design' && '🎨'}
                                            {item.category === 'education' && '📚'}
                                            {item.category === 'games' && '🎮'}
                                        </span>
                                        <div>
                                            <p className="text-sm text-white">{item.name}</p>
                                            <p className="text-xs text-dark-400">x{item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-primary-400">
                                        {formatPrice(item.price * item.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-700">
                            <span className="font-semibold text-white">Total</span>
                            <span className="text-xl font-bold text-primary-400">{formatPrice(total)}</span>
                        </div>
                    </div>

                    {/* Customer Data */}
                    <div className="glass-card p-4">
                        <h2 className="font-semibold text-white mb-4">👤 Data Pembeli</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-dark-300 mb-2">Nama Lengkap *</label>
                                <input
                                    type="text"
                                    value={customer.name}
                                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                    placeholder="Masukkan nama lengkap"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-dark-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={customer.email}
                                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                    placeholder="email@example.com"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-dark-300 mb-2">Nomor WhatsApp *</label>
                                <input
                                    type="tel"
                                    value={customer.whatsapp}
                                    onChange={(e) => setCustomer({ ...customer, whatsapp: e.target.value })}
                                    placeholder="08xxxxxxxxxx"
                                    className="input-field"
                                    required
                                />
                                <p className="text-xs text-dark-500 mt-1">Detail akun akan dikirim ke nomor ini</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="glass-card p-4">
                        <h2 className="font-semibold text-white mb-4">💳 Metode Pembayaran</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => setSelectedPayment(method.id)}
                                    className={`p-3 rounded-xl border text-left transition-all ${selectedPayment === method.id
                                            ? 'bg-primary-500/10 border-primary-500 ring-2 ring-primary-500/20'
                                            : 'bg-dark-800/50 border-dark-700 hover:border-dark-600'
                                        }`}
                                >
                                    <span className="text-2xl">{method.icon}</span>
                                    <p className="font-medium text-white text-sm mt-2">{method.name}</p>
                                    <p className="text-xs text-dark-400">{method.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="w-full btn-primary text-lg py-4">
                        🚀 Kirim Order ke WhatsApp
                    </button>

                    <p className="text-center text-xs text-dark-500">
                        Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                    </p>
                </form>
            </div>
        </div>
    )
}
