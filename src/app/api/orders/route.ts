import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/orders - Get all orders
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const orders = await prisma.order.findMany({
            where: status ? { status: status as any } : undefined,
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(orders)
    } catch (error) {
        console.error('Error fetching orders:', error)
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        )
    }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Generate order number
        const orderNumber = `ORD${Date.now().toString(36).toUpperCase()}`

        // Calculate totals
        const subtotal = body.items.reduce(
            (sum: number, item: { price: number; quantity: number }) =>
                sum + item.price * item.quantity,
            0
        )

        const order = await prisma.order.create({
            data: {
                orderNumber,
                customerName: body.customerName,
                customerEmail: body.customerEmail || null,
                customerPhone: body.customerPhone,
                paymentMethod: body.paymentMethod,
                subtotal,
                total: subtotal, // Can add fees/discounts later
                items: {
                    create: body.items.map((item: { productId: string; quantity: number; price: number }) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json(order, { status: 201 })
    } catch (error) {
        console.error('Error creating order:', error)
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        )
    }
}
