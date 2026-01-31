import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-dark-800 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                <span className="text-dark-900 font-bold text-lg">V</span>
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-white">Vystore</h4>
                                <p className="text-xs text-dark-400">Premium Digital Store</p>
                            </div>
                        </div>
                        <p className="text-sm text-dark-400">
                            Toko akun premium digital terpercaya dengan harga terjangkau.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="font-semibold text-white mb-3">Menu</h5>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-dark-400 hover:text-primary-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a href="/#products" className="text-sm text-dark-400 hover:text-primary-400 transition-colors">
                                    Produk
                                </a>
                            </li>
                            <li>
                                <Link href="/admin" className="text-sm text-dark-400 hover:text-primary-400 transition-colors">
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h5 className="font-semibold text-white mb-3">Kategori</h5>
                        <ul className="space-y-2">
                            <li className="text-sm text-dark-400">🎬 Streaming</li>
                            <li className="text-sm text-dark-400">🎨 Design</li>
                            <li className="text-sm text-dark-400">📚 Education</li>
                            <li className="text-sm text-dark-400">🎮 Games</li>
                        </ul>
                    </div>

                    {/* Payment */}
                    <div>
                        <h5 className="font-semibold text-white mb-3">Pembayaran</h5>
                        <ul className="space-y-2">
                            <li className="text-sm text-dark-400">📱 QRIS</li>
                            <li className="text-sm text-dark-400">🏦 BCA, Mandiri, BRI</li>
                            <li className="text-sm text-dark-400">💳 DANA, OVO, GoPay</li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dark-800 pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-dark-500">
                            © {currentYear} Vystore. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-dark-600">Made with ❤️</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
