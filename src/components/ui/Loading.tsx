'use client'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    }

    return (
        <div
            className={`${sizeClasses[size]} border-dark-600 border-t-primary-500 rounded-full animate-spin ${className}`}
        />
    )
}

interface LoadingPageProps {
    message?: string
}

export function LoadingPage({ message = 'Loading...' }: LoadingPageProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-dark-400 animate-pulse">{message}</p>
        </div>
    )
}

interface LoadingCardProps {
    count?: number
}

export function LoadingProductGrid({ count = 8 }: LoadingCardProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="glass-card p-4 animate-pulse">
                    <div className="h-32 bg-dark-700 rounded-xl mb-4" />
                    <div className="h-4 bg-dark-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-dark-700 rounded w-1/2 mb-4" />
                    <div className="h-6 bg-dark-700 rounded w-1/3 mb-3" />
                    <div className="h-10 bg-dark-700 rounded" />
                </div>
            ))}
        </div>
    )
}
