import Link from "next/link";
import type { PostMeta, PostTag } from "@/lib/posts";

function tagStyle(tag: PostTag) {
  if (tag === "NEWBIE") return "text-neonBlue border-neonBlue/25 bg-neonBlue/10";
  if (tag === "CASE STUDY") return "text-neonOrange border-neonOrange/25 bg-neonOrange/10";
  return "text-red-600 border-red-200 bg-red-50";
}

function formatDateFallback(iso?: string) {
  if (!iso) return "—";
  try {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(y, (m || 1) - 1, d || 1);
    return dt.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function BlogCard({ post }: { post: PostMeta }) {
  // ✅ tags luôn là array
  const primaryTag: PostTag = post.tags[0] ?? "NEWBIE";
  const secondaryTag: PostTag | undefined = post.tags[1];
  const extraCount = Math.max(0, post.tags.length - 2);

  const dateText = post.dateFormatted ?? formatDateFallback(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={[
        "group flex h-full flex-col rounded-2xl border border-borderSoft bg-white p-6 shadow-sm transition",
        "hover:-translate-y-0.5 hover:shadow-card hover:ring-2 hover:ring-neonOrange/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {/* Primary tag */}
          <span
            className={[
              "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-extrabold",
              tagStyle(primaryTag),
            ].join(" ")}
            title={primaryTag}
          >
            {primaryTag}
          </span>

          {/* Secondary tag (optional) */}
          {secondaryTag && (
            <span
              className={[
                "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-extrabold",
                "border-borderSoft bg-mmo text-slate-700",
              ].join(" ")}
              title={secondaryTag}
            >
              {secondaryTag}
            </span>
          )}

          {/* +N tags */}
          {extraCount > 0 && (
            <span className="inline-flex items-center rounded-full border border-borderSoft bg-white px-2.5 py-1 text-xs font-extrabold text-slate-600">
              +{extraCount}
            </span>
          )}

          {/* Category */}
          {post.category && (
            <span className="inline-flex items-center rounded-full border border-borderSoft bg-mmo px-2.5 py-1 text-xs font-bold text-slate-700">
              {post.category}
            </span>
          )}
        </div>

        <span className="shrink-0 text-xs font-semibold text-slate-500">
          {dateText}
        </span>
      </div>

      <h2 className="mt-4 text-lg font-extrabold leading-snug text-slate-900 transition group-hover:text-neonOrange">
        {post.title}
      </h2>

      {post.excerpt ? (
        <p className="mt-2 line-clamp-3 text-sm font-semibold text-slate-700">
          {post.excerpt}
        </p>
      ) : (
        <p className="mt-2 line-clamp-3 text-sm font-semibold text-slate-500">
          Chưa có mô tả.
        </p>
      )}

      <div className="mt-auto pt-6 text-sm font-extrabold text-neonBlue transition group-hover:text-neonOrange">
        Đọc tiếp →
      </div>
    </Link>
  );
}
