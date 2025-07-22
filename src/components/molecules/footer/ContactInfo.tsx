interface ContactInfoProps {
  title: string
  children: React.ReactNode
}

export function ContactInfo({ title, children }: ContactInfoProps) {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <h4 className="text-xs lg:text-sm font-bold leading-[150%] text-foreground">{title}</h4>
      <div className="flex flex-col items-start w-full">
        {children}
      </div>
    </div>
  )
}
