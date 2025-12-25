"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/blog", label: "Blog" },
  { href: "/#community", label: "Cộng đồng" },
  { href: "/#about", label: "Giới thiệu" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false; // anchor: không đánh active theo pathname
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeMap = useMemo(() => {
    const m = new Map<string, boolean>();
    for (const item of NAV) m.set(item.href, isActive(pathname, item.href));
    return m;
  }, [pathname]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-borderSoft bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3" onClick={closeMenu}>
          <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-neonBlue/15 to-neonOrange/15 ring-1 ring-borderSoft shadow-sm" />
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight text-slate-900 transition group-hover:text-neonOrange">
              MMO BLOGS
            </div>
            <div className="text-xs font-semibold text-slate-600">
              Make Money Online
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-extrabold text-slate-700 md:flex">
          {NAV.map((i) => {
            const active = activeMap.get(i.href);
            return (
              <Link
                key={i.href}
                href={i.href}
                className={[
                  "transition hover:text-slate-900",
                  active ? "text-slate-900" : "",
                ].join(" ")}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="hidden rounded-2xl bg-neonOrange px-4 py-2 text-sm font-extrabold text-white shadow-card transition hover:brightness-95 md:inline-flex"
          >
            Đọc ngay
          </Link>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-2xl border border-borderSoft bg-white px-3 py-2 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50 md:hidden"
            aria-expanded={open}
            aria-label="Mở menu"
          >
            {open ? "Đóng" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-borderSoft bg-white/90 backdrop-blur md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex flex-col gap-2">
              {NAV.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={closeMenu}
                  className="rounded-2xl border border-borderSoft bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  {i.label}
                </Link>
              ))}

              <Link
                href="/blog"
                onClick={closeMenu}
                className="rounded-2xl bg-neonOrange px-4 py-3 text-center text-sm font-extrabold text-white shadow-card transition hover:brightness-95"
              >
                Đọc ngay
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
