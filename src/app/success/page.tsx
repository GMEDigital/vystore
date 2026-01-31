'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('order') || `VY-${Date.now()}`
    const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes countdown

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Halo Admin Vystore!\n\nSaya telah melakukan pembayaran untuk pesanan:\n📦 Order ID: ${orderId}\n\nMohon segera diproses. Terima kasih!`
        )
        window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
    }

    const copyOrderId = () => {
        navigator.clipboard.writeText(orderId)
        alert('Order ID berhasil disalin!')
    }

    return (
        <div className="min-h-screen pb-24">
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
                            <h1 className="font-display font-bold text-lg text-white">Pesanan Berhasil</h1>
                            <p className="text-xs text-dark-400">Terima kasih telah berbelanja!</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 max-w-lg">
                {/* Progress Indicator */}
                <div className="glass-card p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                                ✓
                            </div>
                            <span className="text-xs text-dark-400 mt-2">Order</span>
                        </div>
                        <div className="flex-1 h-1 bg-primary-500 mx-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold animate-pulse">
                                2
                            </div>
                            <span className="text-xs text-primary-400 mt-2">Bayar</span>
                        </div>
                        <div className="flex-1 h-1 bg-dark-700 mx-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-dark-700 text-dark-400 flex items-center justify-center font-bold">
                                3
                            </div>
                            <span className="text-xs text-dark-500 mt-2">Selesai</span>
                        </div>
                    </div>
                </div>

                {/* Success Icon */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/20 mb-4">
                        <span className="text-5xl">✅</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Pesanan Diterima!</h2>
                    <p className="text-dark-400">Silakan selesaikan pembayaran Anda</p>
                </div>

                {/* Order ID */}
                <div className="glass-card p-4 mb-6">
                    <p className="text-sm text-dark-400 mb-2">Nomor Pesanan</p>
                    <div className="flex items-center justify-between bg-dark-800/50 rounded-xl p-4">
                        <span className="text-xl font-mono font-bold text-white">{orderId}</span>
                        <button
                            onClick={copyOrderId}
                            className="px-3 py-1 rounded-lg bg-dark-700 text-sm text-dark-300 hover:text-white transition-colors"
                        >
                            📋 Copy
                        </button>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="glass-card p-6 mb-6 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                    <p className="text-sm text-dark-400 mb-2">⏰ Batas Waktu Pembayaran</p>
                    <div className={`text-4xl font-mono font-bold ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-orange-400'}`}>
                        {formatTime(timeLeft)}
                    </div>
                    {timeLeft < 300 && (
                        <p className="text-xs text-red-400 mt-2">Segera selesaikan pembayaran!</p>
                    )}
                </div>

                {/* Next Steps */}
                <div className="glass-card p-4 mb-6">
                    <h3 className="font-semibold text-white mb-4">📋 Langkah Selanjutnya</h3>
                    <ol className="text-sm text-dark-300 space-y-3 list-decimal list-inside">
                        <li className="flex items-start gap-2">
                            <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                            <span>Lakukan pembayaran sesuai metode yang dipilih</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                            <span>Screenshot bukti transfer/pembayaran</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                            <span>Kirim bukti pembayaran via WhatsApp</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                            <span>Tunggu konfirmasi admin (5-15 menit)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">5</span>
                            <span>Akun/produk digital akan dikirim via WhatsApp</span>
                        </li>
                    </ol>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleWhatsApp}
                        className="w-full py-4 rounded-xl font-semibold text-lg bg-green-500 hover:bg-green-600 text-white transition-all flex items-center justify-center gap-2"
                    >
                        <span className="text-xl">💬</span>
                        Kirim Bukti via WhatsApp
                    </button>

                    <Link
                        href="/"
                        className="w-full py-4 rounded-xl font-semibold text-lg bg-dark-800 hover:bg-dark-700 text-white transition-all flex items-center justify-center gap-2 border border-dark-700"
                    >
                        🏠 Kembali ke Beranda
                    </Link>
                </div>

                {/* Help Notice */}
                <div className="mt-6 p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                    <p className="text-xs text-dark-400 text-center">
                        Butuh bantuan? Hubungi kami di WhatsApp <span className="text-primary-400">0812-3456-7890</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-dark-400">Loading...</div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    )
}
