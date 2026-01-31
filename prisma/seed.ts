import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { name: 'streaming' },
            update: {},
            create: { name: 'streaming', icon: '🎬' },
        }),
        prisma.category.upsert({
            where: { name: 'design' },
            update: {},
            create: { name: 'design', icon: '🎨' },
        }),
        prisma.category.upsert({
            where: { name: 'education' },
            update: {},
            create: { name: 'education', icon: '📚' },
        }),
        prisma.category.upsert({
            where: { name: 'games' },
            update: {},
            create: { name: 'games', icon: '🎮' },
        }),
    ])

    console.log(`✅ Created ${categories.length} categories`)

    // Create products
    const streamingCat = categories.find(c => c.name === 'streaming')!
    const designCat = categories.find(c => c.name === 'design')!
    const educationCat = categories.find(c => c.name === 'education')!
    const gamesCat = categories.find(c => c.name === 'games')!

    const products = [
        {
            name: 'Netflix Premium 1 Bulan',
            description: 'Akun Netflix Premium UHD 4K, bisa 4 profile, tanpa iklan.',
            price: 35000,
            originalPrice: 54000,
            categoryId: streamingCat.id,
            badge: 'bestseller',
            duration: '1 Bulan',
            features: ['Ultra HD 4K', '4 Profile', 'Tanpa Iklan', 'Garansi Full'],
            stock: 50,
        },
        {
            name: 'Netflix Premium 1 Tahun',
            description: 'Akun Netflix Premium UHD 4K untuk setahun penuh.',
            price: 299000,
            originalPrice: 648000,
            categoryId: streamingCat.id,
            badge: 'promo',
            duration: '1 Tahun',
            features: ['Ultra HD 4K', '4 Profile', 'Tanpa Iklan', 'Garansi Full'],
            stock: 30,
        },
        {
            name: 'Spotify Premium 1 Bulan',
            description: 'Spotify Premium tanpa iklan, download offline, kualitas audio tinggi.',
            price: 15000,
            originalPrice: 25000,
            categoryId: streamingCat.id,
            duration: '1 Bulan',
            features: ['Tanpa Iklan', 'Download Offline', 'Audio HQ', 'Akun Pribadi'],
            stock: 100,
        },
        {
            name: 'Spotify Premium 1 Tahun',
            description: 'Spotify Premium setahun penuh dengan semua fitur.',
            price: 120000,
            originalPrice: 300000,
            categoryId: streamingCat.id,
            badge: 'bestseller',
            duration: '1 Tahun',
            features: ['Tanpa Iklan', 'Download Offline', 'Audio HQ', 'Akun Pribadi'],
            stock: 45,
        },
        {
            name: 'Canva Pro 1 Bulan',
            description: 'Akses semua template, elemen premium, dan fitur AI Canva.',
            price: 25000,
            originalPrice: 45000,
            categoryId: designCat.id,
            duration: '1 Bulan',
            features: ['Template Premium', 'Brand Kit', 'Magic Resize', 'AI Tools'],
            stock: 60,
        },
        {
            name: 'Canva Pro 1 Tahun',
            description: 'Canva Pro setahun penuh untuk kebutuhan desain profesional.',
            price: 199000,
            originalPrice: 540000,
            categoryId: designCat.id,
            badge: 'promo',
            duration: '1 Tahun',
            features: ['Template Premium', 'Brand Kit', 'Magic Resize', 'AI Tools'],
            stock: 25,
        },
        {
            name: 'YouTube Premium 1 Bulan',
            description: 'YouTube tanpa iklan, background play, dan YouTube Music.',
            price: 20000,
            originalPrice: 35000,
            categoryId: streamingCat.id,
            duration: '1 Bulan',
            features: ['Tanpa Iklan', 'Background Play', 'YouTube Music', 'Download Video'],
            stock: 80,
        },
        {
            name: 'YouTube Premium 1 Tahun',
            description: 'YouTube Premium setahun penuh, hemat maksimal.',
            price: 180000,
            originalPrice: 420000,
            categoryId: streamingCat.id,
            badge: 'bestseller',
            duration: '1 Tahun',
            features: ['Tanpa Iklan', 'Background Play', 'YouTube Music', 'Download Video'],
            stock: 35,
        },
        {
            name: 'ChatGPT Plus 1 Bulan',
            description: 'Akses GPT-4, respon lebih cepat, dan fitur terbaru.',
            price: 85000,
            originalPrice: 125000,
            categoryId: educationCat.id,
            duration: '1 Bulan',
            features: ['GPT-4 Access', 'Faster Response', 'Priority Access', 'Plugin Support'],
            stock: 20,
        },
        {
            name: 'Grammarly Premium 1 Tahun',
            description: 'Koreksi grammar AI, plagiarism checker, writing suggestions.',
            price: 150000,
            originalPrice: 350000,
            categoryId: educationCat.id,
            badge: 'promo',
            duration: '1 Tahun',
            features: ['AI Writing', 'Plagiarism Check', 'Tone Detector', 'All Devices'],
            stock: 40,
        },
        {
            name: 'Xbox Game Pass Ultimate 1 Bulan',
            description: 'Akses ratusan game Xbox dan PC, EA Play included.',
            price: 45000,
            originalPrice: 75000,
            categoryId: gamesCat.id,
            duration: '1 Bulan',
            features: ['100+ Games', 'EA Play', 'Cloud Gaming', 'Xbox Live Gold'],
            stock: 55,
        },
        {
            name: 'Discord Nitro 1 Bulan',
            description: 'Custom tag, boost server, emoji global, streaming HD.',
            price: 35000,
            originalPrice: 55000,
            categoryId: gamesCat.id,
            duration: '1 Bulan',
            features: ['Custom Tag', '2 Server Boost', 'HD Streaming', 'Global Emoji'],
            stock: 0,
            badge: 'outofstock',
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.name.toLowerCase().replace(/\s+/g, '-') },
            update: product,
            create: {
                id: product.name.toLowerCase().replace(/\s+/g, '-'),
                ...product,
            },
        })
    }

    console.log(`✅ Created ${products.length} products`)

    // Create initial settings
    const settings = [
        { key: 'store_name', value: 'Vystore' },
        { key: 'store_description', value: 'Premium Digital Store' },
        { key: 'whatsapp_number', value: '6281234567890' },
        { key: 'bank_bca', value: '1234567890|VYSTORE DIGITAL' },
        { key: 'bank_mandiri', value: '0987654321|VYSTORE DIGITAL' },
        { key: 'bank_bri', value: '1122334455|VYSTORE DIGITAL' },
        { key: 'ewallet_dana', value: '081234567890' },
        { key: 'ewallet_ovo', value: '081234567890' },
        { key: 'ewallet_gopay', value: '081234567890' },
    ]

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: { value: setting.value },
            create: setting,
        })
    }

    console.log(`✅ Created ${settings.length} settings`)
    console.log('🎉 Seeding complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
