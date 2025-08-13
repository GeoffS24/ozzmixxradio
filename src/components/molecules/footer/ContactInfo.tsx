interface ContactInfoProps {
  title: string
  children: React.ReactNode
}

export function ContactInfo({ title, children }: ContactInfoProps) {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <span className="text-xs lg:text-sm font-bold  text-foreground">{title}</span>
      <div className="flex flex-col items-start w-full">
        {children}
      </div>
    </div>
  )
}
