import { cn } from "@/lib/utils"

interface FilterButtonProps {
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
  isFirst?: boolean
}

export function FilterButton({ children, isActive, onClick, isFirst = false }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex px-4 py-2.5 justify-center items-center gap-2 text-sm lg:text-base font-medium transition-colors",
        isActive
          ? "border border-border bg-muted text-foreground"
          : "text-foreground hover:bg-muted/50",
        isFirst ? "" : ""
      )}
    >
      {children}
    </button>
  )
}
