"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Trang chủ", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Cộng đồng", href: "/#community" },
  { label: "Giới thiệu", href: "/#about" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
  if (href === "/") return pathname === "/";
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link
          href="/"
          className="group relative flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-sm transition hover:shadow-md"
        >
          {/* glow nhẹ */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-neonBlue/10 to-neonOrange/10 opacity-0 blur group-hover:opacity-100 transition" />

          <Image
            src="/logo.jpg"
            alt="MMO Blogs Logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-gray-200"
            priority
          />

          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-wide text-slate-900">
              MMO <span className="text-neonOrange">BLOGS</span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-700">
              Make Money Online
            </span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden gap-8 md:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-[15px] font-bold tracking-wide transition",
                  active
                    ? "text-neonOrange"
                    : "text-slate-700 hover:text-neonOrange",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="md:hidden rounded-xl border border-borderSoft bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:bg-bgSoft"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Đóng" : "Menu"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <>
          <button
            aria-label="Close menu"
              className="fixed inset-0 z-40 bg-slate-900/10"
            onClick={() => setOpen(false)}
          />

          <div className="fixed left-0 right-0 top-[72px] z-50 md:hidden">
            <div
              ref={panelRef}
              className="mx-3 rounded-2xl border border-gray-200 bg-white shadow-md"
            >
              <div className="grid gap-1 p-3 text-[15px] font-bold">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={[
                        "rounded-xl px-4 py-2 transition",
                        active
                          ? "bg-bgSoft text-neonOrange"
                          : "text-slate-800 hover:bg-bgSoft",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
