import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            {/* Background effects */}
            <div className="bg-glow bg-glow-gold" />

            {/* Content */}
            <div className="relative z-10">
                <div className="text-8xl mb-6 animate-float">🔍</div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                    404
                </h1>
                <h2 className="text-xl text-dark-300 mb-6">
                    Halaman tidak ditemukan
                </h2>
                <p className="text-dark-400 mb-8 max-w-md">
                    Maaf, halaman yang Anda cari tidak ada. Mungkin sudah dipindahkan atau dihapus.
                </p>
                <Link href="/" className="btn-primary inline-flex items-center gap-2">
                    ← Kembali ke Beranda
                </Link>
            </div>
        </div>
    )
}
