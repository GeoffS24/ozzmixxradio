"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  debounceMs?: number
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  debounceMs = 500,
}: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [localValue, setLocalValue] = useState(value)

  // Debounce search updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
        
        // Update URL with search params
        const params = new URLSearchParams(searchParams.toString())
        if (localValue) {
          params.set('search', localValue)
        } else {
          params.delete('search')
        }
        params.delete('page') // Reset to first page when searching
        
        const newUrl = params.toString() ? `?${params.toString()}` : ''
        router.push(`/news${newUrl}`, { scroll: false })
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [localValue, value, onChange, router, searchParams, debounceMs])

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleClear = () => {
    setLocalValue('')
    onChange('')
    
    // Update URL to remove search param
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    params.delete('page')
    
    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(`/news${newUrl}`, { scroll: false })
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-3 border border-border rounded-lg",
            "bg-background text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-colors duration-200"
          )}
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  )
}
