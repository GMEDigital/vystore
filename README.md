# 🛒 Vystore - Premium Digital Store

Platform e-commerce profesional untuk penjualan akun premium digital (Netflix, Spotify, Canva, dll) dengan sistem order via WhatsApp dan verifikasi pembayaran manual.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)

## ✨ Features

### Customer-Facing
- 🛍️ **Product Catalog** - Grid layout dengan kategori filter
- 🏷️ **Smart Labels** - Terlaris, Promo, Stok Habis
- 👁️ **Quick View** - Detail produk tanpa pindah halaman
- 🛒 **Shopping Cart** - Keranjang dengan localStorage
- 📱 **WhatsApp Order** - Kirim order langsung ke admin
- 💳 **Multi-Payment** - QRIS, Bank Transfer, E-Wallet
- 📤 **Upload Bukti** - Konfirmasi pembayaran dengan foto

### Admin Panel
- 📊 **Dashboard** - Statistik produk, order, revenue
- 📦 **Product CRUD** - Tambah/Edit/Hapus produk
- 📋 **Order Management** - Tracking status pesanan
- 📋 **Copy Details** - Salin detail akun untuk pelanggan
- ⚙️ **Settings** - Konfigurasi rekening & e-wallet

## 🚀 Quick Start

```bash
# Clone & install
git clone https://github.com/username/vystore.git
cd vystore
npm install

# Run development
npm run dev

# Open http://localhost:3000
```

## 🗄️ Database Setup (Optional)

```bash
# 1. Create PostgreSQL database at:
#    - Vercel Postgres: vercel.com/storage
#    - Neon: neon.tech
#    - Supabase: supabase.com

# 2. Update .env
DATABASE_URL="postgresql://user:password@host:5432/vystore"

# 3. Push schema & seed
npx prisma db push
npm run db:seed
```

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data
├── src/
│   ├── app/
│   │   ├── page.tsx       # Homepage
│   │   ├── checkout/      # Checkout flow
│   │   ├── payment/       # Payment confirmation
│   │   ├── admin/         # Admin panel
│   │   └── api/           # REST API routes
│   ├── components/        # UI Components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities
│   └── data/              # Static data (fallback)
└── public/                # Static assets
```

## ⚙️ Configuration

| File | Description |
|------|-------------|
| `src/lib/whatsapp.ts` | Admin WhatsApp number |
| `src/app/payment/page.tsx` | Bank accounts & e-wallets |
| `.env` | Database connection URL |
| `prisma.config.ts` | Prisma configuration |

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add `DATABASE_URL` environment variable
4. Deploy!

## 📜 License

MIT License - use freely for personal or commercial projects.

---

Built with ❤️ using Next.js, Tailwind CSS, and Prisma
