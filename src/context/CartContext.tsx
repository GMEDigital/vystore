'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useCart, CartItem } from '@/hooks/useCart'
import { Product } from '@/data/products'

interface CartContextType {
    items: CartItem[]
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    total: number
    itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const cart = useCart()

    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider')
    }
    return context
}
