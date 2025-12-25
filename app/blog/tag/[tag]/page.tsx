// app/blog/tag/[tag]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, type PostTag, type PostCategory } from "@/lib/posts";
import BlogCard from "@/components/blog/BlogCard";
import Pill from "@/components/ui/Pill";

type Props = { params: { tag: string } };

function normalizeParamTag(raw: string) {
  return decodeURIComponent(raw).trim();
}

function toUpper(raw: string) {
  return raw.trim().toUpperCase();
}

function isPostTag(x: string): x is PostTag {
  return x === "NEWBIE" || x === "CASE STUDY" || x === "SCAM";
}

function isPostCategory(x: string): x is PostCategory {
  return x === "Affiliate" || x === "Tool" || x === "Case Study" || x === "Anti-Scam";
}

function toneForTag(tag: PostTag): "blue" | "orange" | "red" {
  if (tag === "SCAM") return "red";
  if (tag === "CASE STUDY") return "orange";
  return "blue";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const raw = normalizeParamTag(params.tag);
  const upper = toUpper(raw);

  const title =
    isPostTag(upper) ? `Tag: ${upper}` : isPostCategory(raw) ? `Danh mục: ${raw}` : `Chủ đề: ${raw}`;

  return {
    title,
    description: `Danh sách bài viết theo ${title.toLowerCase()} trên MMO Blogs.`,
    openGraph: {
      title,
      description: `Xem các bài viết theo ${title.toLowerCase()}.`,
      type: "website",
    },
  };
}

export default function TagPage({ params }: Props) {
  const raw = normalizeParamTag(params.tag);
  const upper = toUpper(raw);

  const postsAll = getAllPosts();

  const posts = postsAll.filter((p) => {
    // ✅ match TAG (NEWBIE/CASE STUDY/SCAM) — lib đảm bảo p.tags luôn là array
    if (isPostTag(upper)) return p.tags.includes(upper);

    // ✅ match CATEGORY (Affiliate/Tool/Case Study/Anti-Scam)
    if (isPostCategory(raw)) return p.category === raw;

    // ✅ fallback: allow category match by param (trường hợp bạn encode category qua đây)
    return p.category?.toLowerCase() === raw.toLowerCase();
  });

  const pageLabel = isPostTag(upper)
    ? { type: "tag" as const, value: upper }
    : isPostCategory(raw)
    ? { type: "category" as const, value: raw }
    : { type: "topic" as const, value: raw };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {pageLabel.type === "tag"
              ? "Tag"
              : pageLabel.type === "category"
              ? "Danh mục"
              : "Chủ đề"}{" "}
            :{" "}
            <span className="text-neonOrange">
              {pageLabel.value}
            </span>
          </h1>

          <p className="mt-2 text-[15px] font-semibold text-slate-600 md:text-base">
            {posts.length} bài viết
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {pageLabel.type === "tag" ? (
            <Pill tone={toneForTag(pageLabel.value)}>{pageLabel.value}</Pill>
          ) : (
            <Pill tone="neutral">{pageLabel.value}</Pill>
          )}

          <Link
            href="/blog"
            className="rounded-2xl border border-borderSoft bg-white px-4 py-2 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-mmo"
          >
            ← Về Blog
          </Link>
        </div>
      </div>

      {/* Grid */}
      {posts.length > 0 ? (
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-borderSoft bg-white p-8 text-center shadow-sm">
          <div className="text-lg font-extrabold text-slate-900">Chưa có bài viết</div>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Hiện chưa có bài nào thuộc nhóm này. Bạn có thể xem tất cả bài viết trong blog.
          </p>

          <Link
            href="/blog"
            className="mt-5 inline-flex rounded-2xl bg-neonOrange px-5 py-3 font-extrabold text-white shadow-card transition hover:brightness-95"
          >
            Xem tất cả bài viết
          </Link>
        </div>
      )}
    </main>
  );
}
