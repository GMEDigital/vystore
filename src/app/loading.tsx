import LoadingSpinner from '@/components/ui/Loading'

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-dark-400 animate-pulse">Memuat...</p>
        </div>
    )
}
