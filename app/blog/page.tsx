"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

// --- Types ---
type Category = "Affiliate" | "Tool" | "Case Study" | "Anti-Scam";
type Tag = "NEWBIE" | "CASE STUDY" | "SCAM";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: Tag[];
  date?: string; // "2025-01-01"
};

// --- Demo Data ---
const POSTS: Post[] = [
  {
    slug: "mmo-la-gi",
    title: "MMO là gì? Bắt đầu đúng cách",
    excerpt: "Tổng quan thực tế cho người mới tránh ảo tưởng.",
    category: "Affiliate",
    tags: ["NEWBIE"],
    date: "2025-01-01",
  },
  {
    slug: "affiliate-2025",
    title: "Affiliate 2025 còn sống?",
    excerpt: "Phân tích mô hình, rủi ro & cơ hội.",
    category: "Case Study",
    tags: ["CASE STUDY"],
    date: "2025-01-02",
  },
  {
    slug: "5-dau-hieu-scam",
    title: "5 dấu hiệu dự án lừa đảo",
    excerpt: "Những chiêu trò phổ biến hiện nay.",
    category: "Anti-Scam",
    tags: ["SCAM"],
    date: "2025-01-03",
  },
];

// --- Utils ---
function tagStyle(tag: Tag) {
  if (tag === "NEWBIE") return "text-neonBlue border-neonBlue/25 bg-neonBlue/10";
  if (tag === "CASE STUDY")
    return "text-neonOrange border-neonOrange/25 bg-neonOrange/10";
  return "text-red-600 border-red-200 bg-red-50";
}

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;

  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safe})`, "gi"));

  return parts.map((part, i) => {
    const isHit = part.toLowerCase() === q.toLowerCase();
    return isHit ? (
      <mark
        key={i}
        className="rounded bg-yellow-200 px-0.5 font-extrabold text-slate-900"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "ALL">("ALL");
  const [activeTag, setActiveTag] = useState<Tag | "ALL">("ALL");
  const [sort, setSort] = useState<"NEW" | "AZ">("NEW");

  const categories = useMemo(() => {
    const set = new Set<Category>();
    POSTS.forEach((p) => set.add(p.category));
    return ["ALL", ...Array.from(set)] as const;
  }, []);

  const tags = useMemo(() => {
    const set = new Set<Tag>();
    POSTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["ALL", ...Array.from(set)] as const;
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);

    let list = POSTS.slice();

    if (activeCategory !== "ALL") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeTag !== "ALL") {
      list = list.filter((p) => p.tags.includes(activeTag));
    }

    if (q) {
      list = list.filter((p) => {
        const hay = normalize(
          `${p.title} ${p.excerpt} ${p.category} ${p.tags.join(" ")}`
        );
        return hay.includes(q);
      });
    }

    if (sort === "AZ") {
      list.sort((a, b) => a.title.localeCompare(b.title, "vi"));
    } else {
      list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }

    return list;
  }, [query, activeCategory, activeTag, sort]);

  return (
    <div className="min-h-screen bg-mmo pb-16 text-slate-900">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pt-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold md:text-4xl">Blog MMO</h1>
            <p className="mt-2 text-base font-medium text-slate-700">
              Bài viết thực chiến – hạn chế rủi ro – ưu tiên bền vững.
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "NEW" | "AZ")}
            className="w-full rounded-xl border border-borderSoft bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none focus:border-neonOrange md:w-44"
          >
            <option value="NEW">Mới nhất</option>
            <option value="AZ">A → Z</option>
          </select>
        </div>

        {/* Search */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm bài viết..."
          className="w-full rounded-2xl border border-borderSoft bg-white px-4 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-neonOrange focus:ring-2 focus:ring-neonOrange/20"
        />

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
                    "rounded-full border px-4 py-2 text-sm font-bold transition",
                    active
                      ? "border-neonOrange bg-neonOrange/10 text-neonOrange"
                      : "border-borderSoft bg-white text-slate-700 hover:bg-bgSoft",
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
                    "rounded-full border px-4 py-2 text-sm font-bold transition",
                    active
                      ? "border-neonBlue bg-neonBlue/10 text-neonBlue"
                      : "border-borderSoft bg-white text-slate-700 hover:bg-bgSoft",
                  ].join(" ")}
                >
                  {t === "ALL" ? "Tất cả tag" : t}
                </button>
              );
            })}
          </div>

          <div className="text-sm font-semibold text-slate-700">
            {filtered.length} bài viết
          </div>
        </div>

        {/* Grid */}
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className={[
                "group rounded-2xl border border-borderSoft bg-white p-6 shadow-sm transition",
                "hover:-translate-y-0.5 hover:shadow-md hover:ring-2 hover:ring-neonOrange/10",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-extrabold",
                      tagStyle(p.tags[0]),
                    ].join(" ")}
                  >
                    {p.tags[0]}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-borderSoft bg-bgSoft px-2.5 py-1 text-xs font-bold text-slate-700">
                    {p.category}
                  </span>
                </div>

                <span className="text-xs font-semibold text-slate-500">
                  {p.date ?? "—"}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-extrabold leading-snug text-slate-900 transition group-hover:text-neonOrange">
                {highlightMatch(p.title, query)}
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {highlightMatch(p.excerpt, query)}
              </p>

              <div className="mt-6 text-sm font-extrabold text-neonBlue transition group-hover:text-neonOrange">
                Đọc tiếp →
              </div>
            </Link>
          ))}
        </div>

        {/* Empty */}
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
              onClick={() => {
                setQuery("");
                setActiveCategory("ALL");
                setActiveTag("ALL");
                setSort("NEW");
              }}
              className="mt-5 rounded-2xl bg-neonOrange px-5 py-3 font-extrabold text-white shadow-md transition hover:brightness-95"
            >
              Reset bộ lọc
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
