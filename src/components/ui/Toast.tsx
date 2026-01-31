'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
    message: string
    type?: 'success' | 'error' | 'info'
    duration?: number
    onClose: () => void
}

export default function Toast({
    message,
    type = 'success',
    duration = 3000,
    onClose
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300) // Wait for fade animation
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
    }

    const colors = {
        success: 'bg-green-500/20 border-green-500/30 text-green-400',
        error: 'bg-red-500/20 border-red-500/30 text-red-400',
        info: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    }

    return (
        <div
            className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl border backdrop-blur-xl flex items-center gap-3 transition-all duration-300 ${colors[type]} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
        >
            <span>{icons[type]}</span>
            <span className="text-sm font-medium">{message}</span>
            <button
                onClick={() => {
                    setIsVisible(false)
                    setTimeout(onClose, 300)
                }}
                className="ml-2 hover:opacity-70"
            >
                ✕
            </button>
        </div>
    )
}

// Toast hook for easy usage
import { createContext, useContext, useCallback, ReactNode } from 'react'

interface ToastContextType {
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastItem {
    id: number
    message: string
    type: 'success' | 'error' | 'info'
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
    }, [])

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
