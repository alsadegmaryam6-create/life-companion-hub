import { Link } from "@tanstack/react-router";
import { Heart, Home, LayoutGrid, Search, Stethoscope } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "الرئيسية", icon: Home, exact: true },
  { to: "/search", label: "البحث", icon: Search, exact: false },
  { to: "/services", label: "الخدمات", icon: LayoutGrid, exact: false },
  { to: "/doctors", label: "الأطباء", icon: Stethoscope, exact: false },
  { to: "/favorites", label: "المفضلة", icon: Heart, exact: false },
] as const;

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {title ? (
        <header className="bg-primary px-4 pb-5 pt-6 text-primary-foreground shadow-md">
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm opacity-85">{subtitle}</p> : null}
        </header>
      ) : null}
      <main className="mx-auto w-full max-w-screen-sm px-4 py-5">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur">
        <ul className="mx-auto flex max-w-screen-sm items-stretch justify-between px-1 py-1.5">
          {navItems.map(({ to, label, icon: Icon, exact }) => (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="flex flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[11px] font-medium transition-colors"
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
