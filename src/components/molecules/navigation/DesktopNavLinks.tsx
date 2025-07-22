import { NavLink } from '@/components/atoms/ui/NavLink'

export function DesktopNavLinks() {
  return (
    <div className="flex items-center gap-8">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About Us</NavLink>
      <NavLink href="/schedule">Schedule</NavLink>
    </div>
  )
}
