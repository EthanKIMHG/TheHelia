"use client";

import clsx from "clsx";
import type { NavItem } from "./types";

type DesktopPrimaryNavProps = {
  navItems: NavItem[];
  activeNav: NavItem | null;
  isActivePath: (item: NavItem) => boolean;
  onNavClick: (item: NavItem) => void;
};

export function DesktopPrimaryNav({
  navItems,
  activeNav,
  isActivePath,
  onNavClick,
}: DesktopPrimaryNavProps) {
  return (
    <nav className="hidden items-center justify-center md:flex md:gap-4 lg:gap-12">
      {navItems.map((item) => {
        const active = activeNav?.id === item.id || isActivePath(item);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavClick(item)}
            aria-haspopup="dialog"
            aria-expanded={active}
            aria-controls={active ? "desktop-nav-panel" : undefined}
            className="relative cursor-pointer rounded-2xl text-base text-secondary transition-colors"
          >
            {item.label}
            <span
              className={clsx(
                "absolute -bottom-2 left-1/2 h-px w-6 -translate-x-1/2 transition-opacity",
                active ? "bg-secondary opacity-100" : "bg-secondary/40 opacity-0",
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
