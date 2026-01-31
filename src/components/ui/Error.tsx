'use client'

interface ErrorDisplayProps {
    title?: string
    message: string
    onRetry?: () => void
}

export default function ErrorDisplay({
    title = 'Oops!',
    message,
    onRetry
}: ErrorDisplayProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <span className="text-5xl mb-4">😵</span>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-dark-400 mb-6 max-w-md">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="btn-primary"
                >
                    🔄 Coba Lagi
                </button>
            )}
        </div>
    )
}

interface EmptyStateProps {
    icon?: string
    title: string
    description?: string
    actionLabel?: string
    onAction?: () => void
}

export function EmptyState({
    icon = '📦',
    title,
    description,
    actionLabel,
    onAction
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <span className="text-5xl mb-4">{icon}</span>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            {description && (
                <p className="text-dark-400 mb-6 max-w-md">{description}</p>
            )}
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="btn-secondary"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    )
}
