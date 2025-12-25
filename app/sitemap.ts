// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

function getBaseUrl() {
  // ✅ Ưu tiên domain khi deploy (Vercel)
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  // ✅ Nếu bạn có set NEXT_PUBLIC_SITE_URL (khuyến nghị)
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) return site.replace(/\/$/, "");

  // ✅ Fallback local dev
  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const posts = getAllPosts();

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => {
    // ✅ date có thể undefined → fallback now
    const lastModified = p.date ? new Date(p.date) : now;

    return {
      url: `${base}/blog/${encodeURIComponent(p.slug)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...postRoutes];
}
