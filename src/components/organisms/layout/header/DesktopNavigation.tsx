"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { LogoLink } from "@/components/molecules/navigation/LogoLink";
import { DesktopNavLinks } from "@/components/molecules/navigation/DesktopNavLinks";
import { DesktopNavActions } from "@/components/molecules/navigation/DesktopNavActions";
import { DesktopDropdown } from "@/components/molecules/navigation/DesktopDropdown";
import { cn } from "@/lib/utils";

export function DesktopNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="hidden lg:flex flex-col items-center bg-white relative">
      {/* Main Header */}
      <div className="flex h-[72px] px-16 justify-between items-center w-full">
        <div className="flex justify-between items-center flex-1">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-6">
            <LogoLink variant="desktop" />
            <DesktopNavLinks />
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex justify-center items-center gap-1 text-base font-normal leading-[150%] text-foreground hover:text-primary transition-colors"
              >
                More Links
                <ChevronDown className={cn("w-6 h-6 transition-transform", isDropdownOpen && "rotate-180")} />
              </button>
            </div>
          </div>
          <DesktopNavActions />
        </div>
      </div>

      {/* Dropdown with animations */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-border transition-all duration-300 ease-in-out z-50",
          isDropdownOpen
            ? "opacity-100 translate-y-0 visible shadow-xl shadow-black/10"
            : "opacity-0 -translate-y-2 invisible shadow-none"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DesktopDropdown />
      </div>
    </nav>
  );
}
