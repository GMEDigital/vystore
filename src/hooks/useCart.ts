'use client'

import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/data/products'

export interface CartItem extends Product {
    quantity: number
}

const CART_KEY = 'vystore_cart'

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(CART_KEY)
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse cart:', e)
            }
        }
    }, [])

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(items))
    }, [items])

    const addToCart = useCallback((product: Product) => {
        if (product.stock === 0) return

        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        setIsOpen(true)
    }, [])

    const removeFromCart = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId))
    }, [])

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }, [removeFromCart])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return {
        items,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
    }
}
