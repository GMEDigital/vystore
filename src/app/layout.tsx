import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vystore.vercel.app'

export const metadata: Metadata = {
    title: {
        default: 'Vystore - Premium Digital Store',
        template: '%s | Vystore',
    },
    description: 'Toko akun premium digital terpercaya. Netflix, Spotify, Canva, YouTube Premium, dan berbagai layanan premium lainnya dengan harga terjangkau dan proses instan.',
    keywords: [
        'akun premium',
        'netflix premium',
        'spotify premium',
        'canva pro',
        'youtube premium',
        'chatgpt plus',
        'digital store',
        'akun murah',
        'jual akun premium',
    ],
    authors: [{ name: 'Vystore' }],
    creator: 'Vystore',
    metadataBase: new URL(siteUrl),
    openGraph: {
        title: 'Vystore - Premium Digital Store',
        description: 'Toko akun premium digital terpercaya dengan harga terjangkau',
        url: siteUrl,
        siteName: 'Vystore',
        locale: 'id_ID',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Vystore - Premium Digital Store',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vystore - Premium Digital Store',
        description: 'Toko akun premium digital terpercaya dengan harga terjangkau',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#0f172a' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="antialiased min-h-screen flex flex-col">
                {/* Background Glow Effects */}
                <div className="bg-glow bg-glow-gold" />
                <div className="bg-glow bg-glow-purple" />

                {/* Main Content */}
                <main className="relative z-10 flex-1 pb-20 md:pb-0">
                    {children}
                </main>
            </body>
        </html>
    )
}
