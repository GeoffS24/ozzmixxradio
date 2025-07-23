"use client"

import { useState } from 'react'
import { LogoLink } from '@/components/molecules/navigation/LogoLink'
import { MobileMenuButton } from '@/components/molecules/navigation/MobileMenuButton'
import { MobileNavLinks } from '@/components/molecules/navigation/MobileNavLinks'
import { MobileNavActions } from '@/components/molecules/navigation/MobileNavActions'

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="lg:hidden bg-white border-b border-border">
      <div className="px-5">
        {/* Mobile Header */}
        <div className="flex justify-between items-center h-16">
          <LogoLink variant="mobile" />
          <MobileMenuButton isOpen={isOpen} onClick={toggleMenu} />
        </div>

        {isOpen && (
          <div className="pb-6">
            <MobileNavLinks />
            <MobileNavActions />
          </div>
        )}
      </div>
    </nav>
  )
}
