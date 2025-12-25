// app/robots.ts
import type { MetadataRoute } from "next";

function getBaseUrl() {
  // ✅ Vercel deploy
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  // ✅ Domain bạn set (khuyến nghị)
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) return site.replace(/\/$/, "");

  // ✅ Local dev
  return "http://localhost:3000";
}

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // chặn route nội bộ/không cần index
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
