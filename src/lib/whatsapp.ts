import { CartItem } from '@/hooks/useCart'

const ADMIN_PHONE = '6281234567890' // Ganti dengan nomor WhatsApp admin

export interface CustomerData {
    name: string
    email: string
    whatsapp: string
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)
}

export function generateWhatsAppMessage(
    items: CartItem[],
    customer: CustomerData,
    paymentMethod: string
): string {
    const itemList = items
        .map((item, idx) => `${idx + 1}. ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`)
        .join('\n')

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const message = `🛒 *ORDER BARU - VYSTORE*
━━━━━━━━━━━━━━━━━━━━

👤 *Data Pembeli:*
Nama: ${customer.name}
Email: ${customer.email}
WhatsApp: ${customer.whatsapp}

📦 *Pesanan:*
${itemList}

━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL: ${formatPrice(total)}*
💳 Metode: ${paymentMethod}
━━━━━━━━━━━━━━━━━━━━

Mohon konfirmasi pesanan saya. Terima kasih! 🙏`

    return message
}

export function generateWhatsAppLink(
    items: CartItem[],
    customer: CustomerData,
    paymentMethod: string
): string {
    const message = generateWhatsAppMessage(items, customer, paymentMethod)
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${ADMIN_PHONE}?text=${encodedMessage}`
}

export function setAdminPhone(phone: string) {
    // This would be used for admin configuration
    // For now, it's hardcoded above
}
