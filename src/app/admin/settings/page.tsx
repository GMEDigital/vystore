'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        whatsappNumber: '6281234567890',
        storeName: 'Vystore',
        storeDescription: 'Premium Digital Store',
        qrisImage: '',
        bankAccounts: [
            { bank: 'BCA', number: '1234567890', name: 'VYSTORE DIGITAL' },
            { bank: 'Mandiri', number: '0987654321', name: 'VYSTORE DIGITAL' },
            { bank: 'BRI', number: '1122334455', name: 'VYSTORE DIGITAL' },
        ],
        ewallets: [
            { name: 'DANA', number: '081234567890' },
            { name: 'OVO', number: '081234567890' },
            { name: 'GoPay', number: '081234567890' },
        ],
    })

    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        // In real app, save to database
        localStorage.setItem('vystore_settings', JSON.stringify(settings))
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="min-h-screen pb-8">
            {/* Title Bar */}
            <div className="border-b border-dark-700 bg-dark-900/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display font-bold text-xl text-white">Pengaturan</h1>
                            <p className="text-sm text-dark-400">Konfigurasi toko Anda</p>
                        </div>
                        <button onClick={handleSave} className="btn-primary text-sm">
                            {saved ? '✓ Tersimpan' : 'Simpan Pengaturan'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">

                {/* Basic Settings */}
                <div className="glass-card p-4">
                    <h2 className="font-semibold text-white mb-4">🏪 Informasi Toko</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-dark-300 mb-2">Nama Toko</label>
                            <input
                                type="text"
                                value={settings.storeName}
                                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-dark-300 mb-2">Deskripsi</label>
                            <input
                                type="text"
                                value={settings.storeDescription}
                                onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
                                className="input-field"
                            />
                        </div>
                    </div>
                </div>

                {/* WhatsApp */}
                <div className="glass-card p-4">
                    <h2 className="font-semibold text-white mb-4">📱 WhatsApp</h2>
                    <div>
                        <label className="block text-sm text-dark-300 mb-2">Nomor WhatsApp Admin</label>
                        <input
                            type="tel"
                            value={settings.whatsappNumber}
                            onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                            placeholder="6281234567890"
                            className="input-field"
                        />
                        <p className="text-xs text-dark-500 mt-1">Format: 62xxxxxxxxxx (tanpa + atau 0 di depan)</p>
                    </div>
                </div>

                {/* QRIS */}
                <div className="glass-card p-4">
                    <h2 className="font-semibold text-white mb-4">📱 QRIS</h2>
                    <div>
                        <label className="block text-sm text-dark-300 mb-2">Upload Gambar QRIS</label>
                        <div className="border-2 border-dashed border-dark-600 rounded-xl p-6 text-center hover:border-primary-500/50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="qris-upload"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        // In real app, upload to storage
                                        setSettings({ ...settings, qrisImage: URL.createObjectURL(file) })
                                    }
                                }}
                            />
                            <label htmlFor="qris-upload" className="cursor-pointer">
                                {settings.qrisImage ? (
                                    <img src={settings.qrisImage} alt="QRIS" className="w-48 h-48 mx-auto object-contain" />
                                ) : (
                                    <>
                                        <span className="text-4xl">📷</span>
                                        <p className="text-dark-400 mt-2">Klik untuk upload gambar QRIS</p>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Bank Accounts */}
                <div className="glass-card p-4">
                    <h2 className="font-semibold text-white mb-4">🏦 Rekening Bank</h2>
                    <div className="space-y-4">
                        {settings.bankAccounts.map((account, idx) => (
                            <div key={idx} className="bg-dark-800/50 p-4 rounded-xl">
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs text-dark-400 mb-1">Bank</label>
                                        <input
                                            type="text"
                                            value={account.bank}
                                            onChange={(e) => {
                                                const newAccounts = [...settings.bankAccounts]
                                                newAccounts[idx].bank = e.target.value
                                                setSettings({ ...settings, bankAccounts: newAccounts })
                                            }}
                                            className="input-field text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-dark-400 mb-1">No. Rekening</label>
                                        <input
                                            type="text"
                                            value={account.number}
                                            onChange={(e) => {
                                                const newAccounts = [...settings.bankAccounts]
                                                newAccounts[idx].number = e.target.value
                                                setSettings({ ...settings, bankAccounts: newAccounts })
                                            }}
                                            className="input-field text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-dark-400 mb-1">Atas Nama</label>
                                        <input
                                            type="text"
                                            value={account.name}
                                            onChange={(e) => {
                                                const newAccounts = [...settings.bankAccounts]
                                                newAccounts[idx].name = e.target.value
                                                setSettings({ ...settings, bankAccounts: newAccounts })
                                            }}
                                            className="input-field text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* E-Wallets */}
                <div className="glass-card p-4">
                    <h2 className="font-semibold text-white mb-4">💳 E-Wallet</h2>
                    <div className="space-y-4">
                        {settings.ewallets.map((wallet, idx) => (
                            <div key={idx} className="bg-dark-800/50 p-4 rounded-xl">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-dark-400 mb-1">Nama</label>
                                        <input
                                            type="text"
                                            value={wallet.name}
                                            onChange={(e) => {
                                                const newWallets = [...settings.ewallets]
                                                newWallets[idx].name = e.target.value
                                                setSettings({ ...settings, ewallets: newWallets })
                                            }}
                                            className="input-field text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-dark-400 mb-1">Nomor</label>
                                        <input
                                            type="text"
                                            value={wallet.number}
                                            onChange={(e) => {
                                                const newWallets = [...settings.ewallets]
                                                newWallets[idx].number = e.target.value
                                                setSettings({ ...settings, ewallets: newWallets })
                                            }}
                                            className="input-field text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
