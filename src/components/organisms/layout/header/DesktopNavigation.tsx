import { LogoLink } from "@/components/molecules/navigation/LogoLink";
import { DesktopNavLinks } from "@/components/molecules/navigation/DesktopNavLinks";
import { DesktopNavActions } from "@/components/molecules/navigation/DesktopNavActions";

export function DesktopNavigation() {
  return (
    <nav className="hidden lg:flex flex-col items-center bg-white relative">
      {/* Main Header */}
      <div className="flex h-[72px] px-16 justify-between items-center w-full">
        <div className="flex justify-between items-center flex-1">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-6">
            <LogoLink variant="desktop" />
            <DesktopNavLinks />
          </div>
          <DesktopNavActions />
        </div>
      </div>
    </nav>
  );
}
