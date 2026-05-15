import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} />
  )
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <LoadingSkeleton className="w-24 h-8" />
          <div className="flex items-center gap-4">
            <LoadingSkeleton className="w-20 h-8 hidden sm:block" />
            <LoadingSkeleton className="w-20 h-8 hidden sm:block" />
            <LoadingSkeleton className="w-10 h-10" />
          </div>
        </div>
      </div>
      
      {/* Main content skeleton */}
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <LoadingSkeleton className="w-full h-96" />
        </div>
      </main>
      
      {/* Footer skeleton */}
      <div className="bg-primary h-32" />
    </div>
  )
}
