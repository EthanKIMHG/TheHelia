import clsx from "clsx";
import Link from "next/link";
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
        if (item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              className={clsx(
                "relative rounded-2xl text-base text-secondary transition-colors",
                active && "text-secondary",
              )}
            >
              {item.label}
              <span
                className={clsx(
                  "absolute -bottom-2 left-1/2 h-px w-6 -translate-x-1/2 transition-opacity",
                  active ? "bg-secondary opacity-100" : "bg-secondary/40 opacity-0",
                )}
              />
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavClick(item)}
            className={clsx(
              "relative cursor-pointer rounded-2xl text-base text-secondary transition-colors ",
              active && "text-secondary",
            )}
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
