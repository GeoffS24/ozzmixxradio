import { NavLink } from '@/components/atoms/ui/NavLink'

export function MobileNavLinks() {
  return (
    <div className="flex flex-col py-4 px-5 gap-2.5">
      <NavLink href="/" variant="mobile">Home</NavLink>
      <NavLink href="/about" variant="mobile">About Us</NavLink>
      <NavLink href="/schedule" variant="mobile">Schedule</NavLink>
    </div>
  )
}
