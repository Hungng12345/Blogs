import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://mmoblogs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MMO Blogs",
    template: "%s | MMO Blogs",
  },
  description:
    "MMO Blogs chia sẻ kiến thức thực chiến về kiếm tiền online: affiliate, tool MMO, case study thật và cảnh báo scam.",
  keywords: [
    "MMO",
    "kiếm tiền online",
    "affiliate marketing",
    "MMO blog",
    "online income",
    "cảnh báo scam",
    "tool MMO",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MMO Blogs",
    description:
      "Blog MMO thực chiến: affiliate, tool, case study và cảnh báo scam.",
    url: siteUrl,
    siteName: "MMO Blogs",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body
        className={[
          inter.className,
          "min-h-screen bg-mmo text-slate-900 antialiased",
          "flex flex-col",
        ].join(" ")}
      >
        <Header />

        {/* ✅ Không bó max-width ở layout để Hero/section full-width */}
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
