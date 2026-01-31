import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/orders/[id] - Get single order
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(order)
    } catch (error) {
        console.error('Error fetching order:', error)
        return NextResponse.json(
            { error: 'Failed to fetch order' },
            { status: 500 }
        )
    }
}

// PUT /api/orders/[id] - Update order status
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const updateData: Record<string, any> = {}

        if (body.status) {
            updateData.status = body.status

            // Set timestamps based on status
            if (body.status === 'PAID') {
                updateData.paidAt = new Date()
            } else if (body.status === 'SENT') {
                updateData.sentAt = new Date()
            }
        }

        if (body.accountDetails !== undefined) {
            updateData.accountDetails = body.accountDetails
        }

        const order = await prisma.order.update({
            where: { id },
            data: updateData,
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error('Error updating order:', error)
        return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
        )
    }
}

// DELETE /api/orders/[id] - Delete order
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.order.delete({
            where: { id },
        })

        return NextResponse.json({ message: 'Order deleted' })
    } catch (error) {
        console.error('Error deleting order:', error)
        return NextResponse.json(
            { error: 'Failed to delete order' },
            { status: 500 }
        )
    }
}
