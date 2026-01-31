'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('App Error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            {/* Background effects */}
            <div className="bg-glow bg-glow-gold" />

            {/* Content */}
            <div className="relative z-10">
                <div className="text-8xl mb-6">😵</div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                    Terjadi Kesalahan
                </h1>
                <p className="text-dark-400 mb-8 max-w-md">
                    Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi atau kembali ke beranda.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="btn-primary"
                    >
                        🔄 Coba Lagi
                    </button>
                    <Link href="/" className="btn-secondary">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    )
}
