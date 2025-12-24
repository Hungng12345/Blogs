import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ===== PRIMARY FONT (READABLE + SHARP) ===== */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ===== MONO (OPTIONAL) ===== */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "MMO Blogs",
  description:
    "Chia sẻ kiến thức MMO, affiliate, tool và cảnh báo scam cho cộng đồng Việt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={[
          inter.variable,
          geistMono.variable,

          /* ===== BASE TYPOGRAPHY ===== */
          "font-sans",
          "text-[16.5px]",        // ✅ chữ to hơn mặc định
          "leading-relaxed",      // ✅ đọc dễ
          "font-normal",          // đã override = 500 trong tailwind config

          /* ===== BASE COLORS ===== */
          "text-slate-900",
          "bg-mmo",

          /* ===== RENDER QUALITY ===== */
          "antialiased",
          "min-h-screen",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
