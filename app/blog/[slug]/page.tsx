// D:\Blogs\simple-blog\app\blog\[slug]\page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllSlugs, getPostBySlug, type PostTag } from "@/lib/posts";
import { formatDateVi } from "@/lib/utils/date";

import BlogContent from "@/components/blog/BlogContent";
import Pill from "@/components/ui/Pill";

type Props = { params: { slug?: string } };

function toneForTag(tag: PostTag): "blue" | "orange" | "red" {
  if (tag === "SCAM") return "red";
  if (tag === "CASE STUDY") return "orange";
  return "blue";
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug?.trim();
  if (!slug) return { title: "Bài viết" };

  const post = await getPostBySlug(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };

  const title = post.title || "Bài viết";
  const description = post.excerpt ?? "Bài viết thực chiến MMO – an toàn – bền vững.";

  // đổi khi deploy
  const base = new URL("https://mmoblogs.com");
  const canonical = new URL(`/blog/${encodeURIComponent(slug)}`, base);

  const images = post.coverImage
    ? [{ url: post.coverImage, alt: title }]
    : undefined;

  return {
    title,
    description,
    metadataBase: base,
    alternates: { canonical: canonical.toString() },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical.toString(),
      images,
      locale: "vi_VN",
      siteName: "MMO Blogs",
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: images?.map((i) => i.url),
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetail({ params }: Props) {
  const slug = params?.slug?.trim();
  if (!slug) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const tags = post.tags; // ✅ theo lib: luôn là array
  const dateFormatted = post.dateFormatted ?? (post.date ? formatDateVi(post.date) : undefined);

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      {/* Top nav */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-extrabold text-neonBlue transition hover:text-neonOrange"
        >
          ← Quay lại Blog
        </Link>

        <div className="flex flex-wrap gap-2">
          {/* Tags */}
          {tags.map((t) => (
            <Link key={t} href={`/blog/tag/${encodeURIComponent(t)}`}>
              <Pill tone={toneForTag(t)}>{t}</Pill>
            </Link>
          ))}

          {/* Category (nếu bạn muốn dùng chung tag route thì giữ như này) */}
          {post.category && (
            <Link href={`/blog/tag/${encodeURIComponent(post.category)}`}>
              <Pill tone="neutral">{post.category}</Pill>
            </Link>
          )}
        </div>
      </div>

      {/* Title */}
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="mt-2 text-sm font-semibold text-slate-500">
        {dateFormatted ?? ""}
        {post.readingTime ? ` • ${post.readingTime}` : ""}
        {post.excerpt ? ` • ${post.excerpt}` : ""}
      </div>

      {/* Content */}
      <BlogContent
        title={post.title}
        contentHtml={post.contentHtml}
        dateFormatted={dateFormatted}
        readingTime={post.readingTime}
        category={post.category}
        tags={post.tags}
        showHeader={false}
      />
    </section>
  );
}
