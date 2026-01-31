import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/products - Get all products
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const activeOnly = searchParams.get('active') !== 'false'

        const products = await prisma.product.findMany({
            where: {
                isActive: activeOnly ? true : undefined,
                category: category && category !== 'all'
                    ? { name: category }
                    : undefined,
            },
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(products)
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const product = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                originalPrice: body.originalPrice || null,
                image: body.image || null,
                duration: body.duration || null,
                stock: body.stock || 10,
                badge: body.badge || null,
                features: body.features || [],
                categoryId: body.categoryId,
            },
            include: {
                category: true,
            },
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        )
    }
}
