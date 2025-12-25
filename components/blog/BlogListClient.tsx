"use client";

import { useMemo, useState } from "react";
import type { PostCategory, PostMeta, PostTag } from "@/lib/posts";
import BlogCard from "@/components/blog/BlogCard";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function BlogListClient({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PostCategory | "ALL">(
    "ALL"
  );
  const [activeTag, setActiveTag] = useState<PostTag | "ALL">("ALL");
  const [sort, setSort] = useState<"NEW" | "AZ">("NEW");

  const categories = useMemo(() => {
    const set = new Set<PostCategory>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["ALL", ...Array.from(set)] as const;
  }, [posts]);

  const tags = useMemo(() => {
    const set = new Set<PostTag>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["ALL", ...Array.from(set)] as const;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    let list = posts.slice(); // copy

    // filter category
    if (activeCategory !== "ALL") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // filter tag
    if (activeTag !== "ALL") {
      list = list.filter((p) => p.tags.includes(activeTag));
    }

    // search (title + excerpt + category + tags)
    if (q) {
      list = list.filter((p) => {
        const hay = normalize(
          `${p.title} ${p.excerpt ?? ""} ${p.category ?? ""} ${p.tags.join(" ")}`
        );
        return hay.includes(q);
      });
    }

    // sort (do not mutate original)
    const sorted = list.slice();
    if (sort === "AZ") {
      sorted.sort((a, b) => a.title.localeCompare(b.title, "vi"));
    } else {
      sorted.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }

    return sorted;
  }, [posts, query, activeCategory, activeTag, sort]);

  const hasFilters =
    query.trim() !== "" ||
    activeCategory !== "ALL" ||
    activeTag !== "ALL" ||
    sort !== "NEW";

  const resetAll = () => {
    setQuery("");
    setActiveCategory("ALL");
    setActiveTag("ALL");
    setSort("NEW");
  };

  return (
    <>
      {/* Top controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="text-sm font-semibold text-slate-700">
          {filtered.length} bài viết
          {(activeCategory !== "ALL" || activeTag !== "ALL" || query.trim()) && (
            <span className="ml-2 text-slate-500">
              • đang lọc{activeCategory !== "ALL" ? `: ${activeCategory}` : ""}
              {activeTag !== "ALL" ? ` / ${activeTag}` : ""}
              {query.trim() ? ` / "${query.trim()}"` : ""}
            </span>
          )}
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "NEW" | "AZ")}
            className="w-full rounded-2xl border border-borderSoft bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm outline-none focus:border-neonOrange md:w-44"
            aria-label="Sắp xếp"
          >
            <option value="NEW">Mới nhất</option>
            <option value="AZ">A → Z</option>
          </select>

          <button
            type="button"
            onClick={resetAll}
            disabled={!hasFilters}
            className={[
              "w-full rounded-2xl border px-4 py-3 text-sm font-extrabold shadow-sm transition md:w-auto",
              hasFilters
                ? "border-borderSoft bg-white text-slate-900 hover:bg-mmo"
                : "cursor-not-allowed border-borderSoft/60 bg-white/60 text-slate-400",
            ].join(" ")}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mt-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm bài viết..."
          className="w-full rounded-2xl border border-borderSoft bg-white px-4 py-3 pr-12 text-base font-semibold text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-neonOrange focus:ring-2 focus:ring-neonOrange/20"
          aria-label="Tìm kiếm bài viết"
        />
        {query.trim() && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-borderSoft bg-white px-3 py-1 text-xs font-extrabold text-slate-700 shadow-sm transition hover:bg-mmo"
            aria-label="Xóa tìm kiếm"
          >
            Xóa
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c === activeCategory;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-extrabold transition",
                  active
                    ? "border-neonOrange bg-neonOrange/10 text-neonOrange"
                    : "border-borderSoft bg-white text-slate-700 hover:bg-mmo",
                ].join(" ")}
              >
                {c === "ALL" ? "Tất cả danh mục" : c}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => {
            const active = t === activeTag;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTag(t)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-extrabold transition",
                  active
                    ? "border-neonBlue bg-neonBlue/10 text-neonBlue"
                    : "border-borderSoft bg-white text-slate-700 hover:bg-mmo",
                ].join(" ")}
              >
                {t === "ALL" ? "Tất cả tag" : t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-7 grid gap-6 md:grid-cols-3">
        {filtered.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-borderSoft bg-white p-8 text-center shadow-sm">
          <div className="text-lg font-extrabold text-slate-900">
            Không tìm thấy bài viết
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Thử đổi từ khoá hoặc chọn danh mục / tag khác.
          </p>

          <button
            type="button"
            onClick={resetAll}
            className="mt-5 rounded-2xl bg-neonOrange px-5 py-3 font-extrabold text-white shadow-card transition hover:brightness-95"
          >
            Reset bộ lọc
          </button>
        </div>
      )}
    </>
  );
}
