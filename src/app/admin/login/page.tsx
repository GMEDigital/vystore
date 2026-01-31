'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function AdminLoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { login, isAuthenticated } = useAuth()

    // Redirect if already authenticated
    if (isAuthenticated) {
        router.push('/admin')
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 500))

        const success = login(password)
        if (success) {
            router.push('/admin')
        } else {
            setError('Password salah. Silakan coba lagi.')
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            {/* Background Effects */}
            <div className="bg-glow bg-glow-gold" />
            <div className="bg-glow bg-glow-purple" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <span className="text-dark-900 font-bold text-2xl">V</span>
                        </div>
                    </Link>
                    <h1 className="font-display text-2xl font-bold text-white mt-4">Admin Login</h1>
                    <p className="text-dark-400 mt-2">Masukkan password untuk mengakses dashboard</p>
                </div>

                {/* Login Card */}
                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-dark-300 mb-2">
                                Password Admin
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password..."
                                    required
                                    className="input-field pl-12"
                                    disabled={isLoading}
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400">
                                    🔐
                                </span>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                                <span>⚠️</span>
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    Memverifikasi...
                                </>
                            ) : (
                                <>
                                    <span>🔓</span>
                                    Masuk ke Dashboard
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-dark-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-dark-800/50 text-dark-400">atau</span>
                        </div>
                    </div>

                    {/* Back to Store */}
                    <Link
                        href="/"
                        className="block w-full btn-secondary text-center"
                    >
                        ← Kembali ke Toko
                    </Link>
                </div>

                {/* Footer Note */}
                <p className="text-center text-dark-500 text-sm mt-6">
                    Lupa password? Hubungi administrator.
                </p>
            </div>
        </div>
    )
}
