import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'

export function Navigation() {
  return (
    <header className='container mx-auto w-full'>
      <DesktopNavigation />
      <MobileNavigation />
    </header>
  )
}