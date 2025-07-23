"use client"

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  searchQuery?: string
  categoryFilter?: string
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  searchQuery = '',
  categoryFilter = '',
  className,
}: PaginationProps) {
  // Helper function to build URL with params
  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    
    if (page > 1) params.set('page', page.toString())
    if (searchQuery) params.set('search', searchQuery)
    if (categoryFilter) params.set('category', categoryFilter)
    
    const queryString = params.toString()
    return `/news${queryString ? `?${queryString}` : ''}`
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2 // Number of pages to show on each side of current page
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const pageNumbers = getPageNumbers()

  return (
    <nav className={cn("flex items-center justify-center gap-2", className)} aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg border border-border",
            "bg-background text-foreground hover:bg-muted transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg border border-border",
            "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Previous page (disabled)"
        >
          <ChevronLeft className="w-5 h-5" />
        </div>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <span
              key={`dots-${index}`}
              className="flex items-center justify-center w-10 h-10 text-muted-foreground"
            >
              ...
            </span>
          )
        }

        const page = pageNumber as number
        const isActive = page === currentPage

        return (
          <Link
            key={page}
            href={buildUrl(page)}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg border transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:bg-muted"
            )}
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Link>
        )
      })}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg border border-border",
            "bg-background text-foreground hover:bg-muted transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg border border-border",
            "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Next page (disabled)"
        >
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </nav>
  )
}
