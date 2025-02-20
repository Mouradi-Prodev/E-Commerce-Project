export default function LoadingSkeleton() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8 rounded-2xl bg-white/90 animate-pulse">
                <div className="h-8 bg-gray-200 rounded-full w-3/4 mx-auto mb-8" />
                <div className="space-y-6">
                    <div className="h-12 bg-gray-200 rounded-lg" />
                    <div className="h-12 bg-gray-200 rounded-lg" />
                    <div className="h-12 bg-gray-200 rounded-lg" />
                </div>
            </div>
        </div>
    )
}
