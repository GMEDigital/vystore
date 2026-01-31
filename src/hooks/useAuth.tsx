'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    login: (password: string) => boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Admin password - in production, this should be an environment variable
const ADMIN_PASSWORD = 'vystore2024'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in
        const authToken = localStorage.getItem('vystore_admin_auth')
        if (authToken === 'authenticated') {
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    const login = (password: string): boolean => {
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('vystore_admin_auth', 'authenticated')
            setIsAuthenticated(true)
            return true
        }
        return false
    }

    const logout = () => {
        localStorage.removeItem('vystore_admin_auth')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
