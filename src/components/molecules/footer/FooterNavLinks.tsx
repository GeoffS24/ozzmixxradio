import { NavLink } from '@/components/atoms/ui/NavLink'

export function FooterNavLinks() {
  return (
    <div className="flex lg:max-w-[400px] lg:flex-row flex-col items-start gap-6 lg:gap-6 flex-1">
      {/* Primary Links */}
      <div className="flex flex-col items-start flex-1">
        <div className="flex py-2 items-start w-full">
          <NavLink href="/" variant="footer">Home Page</NavLink>
        </div>
        <div className="flex py-2 items-start w-full">
          <NavLink href="/about" variant="footer">About Us</NavLink>
        </div>
        <div className="flex py-2 items-start w-full">
          <NavLink href="/listen" variant="footer">Listen</NavLink>
        </div>
        <div className="flex py-2 items-start w-full">
          <NavLink href="/schedule" variant="footer">Schedule</NavLink>
        </div>
      </div>

      {/* Secondary Links */}
      <div className="flex flex-col items-start flex-1">
        <div className="flex py-2 items-start w-full">
          <NavLink href="/blog" variant="footer">Blog</NavLink>
        </div>
        <div className="flex py-2 items-start w-full">
          <NavLink href="/contact" variant="footer">Contact</NavLink>
        </div>
      </div>
    </div>
  )
}
