'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const bankAccounts = [
    { id: 'bca', bank: 'BCA', number: '1234567890', name: 'VYSTORE DIGITAL' },
    { id: 'mandiri', bank: 'Mandiri', number: '0987654321', name: 'VYSTORE DIGITAL' },
    { id: 'bri', bank: 'BRI', number: '1122334455', name: 'VYSTORE DIGITAL' },
]

const ewallets = [
    { id: 'dana', name: 'DANA', number: '081234567890' },
    { id: 'ovo', name: 'OVO', number: '081234567890' },
    { id: 'gopay', name: 'GoPay', number: '081234567890' },
]

function PaymentContent() {
    const searchParams = useSearchParams()
    const method = searchParams.get('method') || 'qris'
    const [copied, setCopied] = useState<string | null>(null)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
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

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    const copyAllDetails = () => {
        let details = ''
        if (method === 'qris') {
            details = 'Pembayaran QRIS - Vystore Digital\nScan kode QRIS untuk bayar'
        } else if (['bca', 'mandiri', 'bri'].includes(method)) {
            const account = bankAccounts.find(a => a.id === method)
            if (account) {
                details = `Bank: ${account.bank}\nNo. Rekening: ${account.number}\na.n. ${account.name}`
            }
        } else {
            const wallet = ewallets.find(w => w.id === method)
            if (wallet) {
                details = `${wallet.name}: ${wallet.number}`
            }
        }
        navigator.clipboard.writeText(details)
        setCopied('all')
        setTimeout(() => setCopied(null), 2000)
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setUploadedFile(file)
        }
    }

    const handleConfirm = () => {
        // In real app, this would send to backend
        alert('Bukti pembayaran berhasil dikirim! Admin akan segera memverifikasi.')
        // Clear cart
        localStorage.removeItem('vystore_cart')
        window.location.href = '/success'
    }

    return (
        <div className="min-h-screen pb-24">
            {/* Header */}
            <header className="sticky top-0 z-30 glass-card border-b border-dark-700 rounded-none">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/checkout"
                            className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white transition-colors"
                        >
                            ←
                        </Link>
                        <div className="flex-1">
                            <h1 className="font-display font-bold text-lg text-white">Pembayaran</h1>
                            <p className="text-xs text-dark-400">Selesaikan pembayaran Anda</p>
                        </div>
                        {/* Timer in header */}
                        <div className={`px-3 py-1 rounded-lg ${timeLeft < 300 ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                            <span className="text-sm font-mono font-bold">⏰ {formatTime(timeLeft)}</span>
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

                {/* Countdown Timer Banner */}
                <div className={`glass-card p-4 mb-6 text-center ${timeLeft < 300 ? 'bg-red-500/10 border-red-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}>
                    <p className="text-sm text-dark-400 mb-1">Batas Waktu Pembayaran</p>
                    <div className={`text-3xl font-mono font-bold ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-orange-400'}`}>
                        {formatTime(timeLeft)}
                    </div>
                    {timeLeft < 300 && (
                        <p className="text-xs text-red-400 mt-1">⚠️ Segera selesaikan pembayaran!</p>
                    )}
                </div>

                {/* Copy All Button */}
                <button
                    onClick={copyAllDetails}
                    className="w-full mb-4 py-3 rounded-xl bg-dark-800 hover:bg-dark-700 border border-dark-700 text-dark-300 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                    <span>{copied === 'all' ? '✓' : '📋'}</span>
                    <span>{copied === 'all' ? 'Detail Disalin!' : 'Salin Semua Detail Pembayaran'}</span>
                </button>

                {/* QRIS */}
                {method === 'qris' && (
                    <div className="glass-card p-6 text-center mb-6">
                        <h2 className="font-semibold text-white mb-4">📱 Scan QRIS</h2>
                        <div className="w-48 h-48 mx-auto bg-white rounded-xl p-4 mb-4">
                            {/* Placeholder for QRIS - replace with actual QRIS image */}
                            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-dark-600 text-sm">
                                [QRIS Image]
                            </div>
                        </div>
                        <p className="text-dark-400 text-sm mb-2">
                            Scan dengan aplikasi e-wallet atau mobile banking
                        </p>
                        <p className="text-xs text-dark-500">
                            QRIS berlaku untuk semua metode pembayaran
                        </p>
                    </div>
                )}

                {/* Bank Transfer */}
                {['bca', 'mandiri', 'bri'].includes(method) && (
                    <div className="glass-card p-4 mb-6">
                        <h2 className="font-semibold text-white mb-4">🏦 Transfer Bank</h2>
                        {bankAccounts
                            .filter(acc => acc.id === method)
                            .map((account) => (
                                <div key={account.id} className="bg-dark-800/50 rounded-xl p-4">
                                    <p className="text-sm text-dark-400 mb-1">Bank {account.bank}</p>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xl font-mono font-bold text-white">{account.number}</span>
                                        <button
                                            onClick={() => copyToClipboard(account.number, account.id)}
                                            className="px-3 py-1 rounded-lg bg-dark-700 text-sm text-dark-300 hover:text-white transition-colors"
                                        >
                                            {copied === account.id ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <p className="text-sm text-dark-400">a.n. {account.name}</p>
                                </div>
                            ))}
                    </div>
                )}

                {/* E-Wallet */}
                {['dana', 'ovo', 'gopay'].includes(method) && (
                    <div className="glass-card p-4 mb-6">
                        <h2 className="font-semibold text-white mb-4">💳 E-Wallet</h2>
                        {ewallets
                            .filter(w => w.id === method)
                            .map((wallet) => (
                                <div key={wallet.id} className="bg-dark-800/50 rounded-xl p-4">
                                    <p className="text-sm text-dark-400 mb-1">{wallet.name}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-mono font-bold text-white">{wallet.number}</span>
                                        <button
                                            onClick={() => copyToClipboard(wallet.number, wallet.id)}
                                            className="px-3 py-1 rounded-lg bg-dark-700 text-sm text-dark-300 hover:text-white transition-colors"
                                        >
                                            {copied === wallet.id ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* Upload Proof */}
                <div className="glass-card p-4 mb-6">
                    <h2 className="font-semibold text-white mb-4">📤 Upload Bukti Bayar</h2>

                    <div className="border-2 border-dashed border-dark-600 rounded-xl p-6 text-center hover:border-primary-500/50 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="proof-upload"
                        />
                        <label htmlFor="proof-upload" className="cursor-pointer">
                            {uploadedFile ? (
                                <div>
                                    <span className="text-4xl">✅</span>
                                    <p className="text-white mt-2">{uploadedFile.name}</p>
                                    <p className="text-xs text-dark-400 mt-1">Klik untuk ganti file</p>
                                </div>
                            ) : (
                                <div>
                                    <span className="text-4xl">📷</span>
                                    <p className="text-dark-400 mt-2">Klik untuk upload foto bukti transfer</p>
                                    <p className="text-xs text-dark-500 mt-1">Format: JPG, PNG (max 5MB)</p>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                {/* Instructions */}
                <div className="glass-card p-4 mb-6">
                    <h2 className="font-semibold text-white mb-3">📋 Petunjuk</h2>
                    <ol className="text-sm text-dark-300 space-y-2 list-decimal list-inside">
                        <li>Transfer sesuai nominal yang tertera</li>
                        <li>Screenshot bukti transfer</li>
                        <li>Upload bukti pembayaran di atas</li>
                        <li>Klik tombol "Konfirmasi Pembayaran"</li>
                        <li>Tunggu verifikasi admin (± 5-15 menit)</li>
                    </ol>
                </div>

                {/* Confirm Button */}
                <button
                    onClick={handleConfirm}
                    disabled={!uploadedFile}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${uploadedFile
                        ? 'btn-primary'
                        : 'bg-dark-700 text-dark-500 cursor-not-allowed'
                        }`}
                >
                    ✅ Konfirmasi Pembayaran
                </button>
            </div>
        </div>
    )
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-dark-400">Loading...</div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    )
}
