"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

type BlogContentProps = {
  title: string;
  contentHtml: string;
  dateFormatted?: string;
  readingTime?: string;
  category?: string;
  tags?: string[];

  /** Nếu page.tsx đã render title/meta rồi → set false để tránh trùng */
  showHeader?: boolean;
};

type TocItem = { id: string; text: string; level: 2 | 3 };

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Gắn id cho h2/h3 để anchor TOC hoạt động
 * + thêm scroll-mt để click không bị header che
 */
function injectHeadingIds(html: string) {
  return html.replace(/<(h2|h3)>(.*?)<\/\1>/gi, (_m: string, tag: string, inner: string) => {
    const plain = inner.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const id = slugifyHeading(plain);

    // Tailwind classes: scroll-mt-24 để khi jump không bị header che
    // (class này apply được nếu bạn dùng prose + tailwind; ở đây inject trực tiếp vào HTML)
    return `<${tag} id="${id}" class="scroll-mt-24">${inner}</${tag}>`;
  });
}

function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<(h2|h3)\s+id="([^"]+)"[^>]*>(.*?)<\/\1>/gi;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(html))) {
    const tag = match[1].toLowerCase();
    const id = match[2];
    const inner = match[3];
    const text = inner.replace(/<[^>]+>/g, "").trim();
    items.push({ id, text, level: tag === "h2" ? 2 : 3 });
  }
  return items;
}

export default function BlogContent({
  title,
  contentHtml,
  dateFormatted,
  readingTime,
  category,
  tags,
  showHeader = true,
}: BlogContentProps) {
  // Progress đọc bài
  const [progress, setProgress] = useState(0);

  // TOC active item (scroll spy)
  const [activeId, setActiveId] = useState<string>("");

  const htmlWithIds = useMemo(() => injectHeadingIds(contentHtml), [contentHtml]);
  const toc = useMemo(() => extractToc(htmlWithIds), [htmlWithIds]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: highlight mục đang đọc trong TOC
  useEffect(() => {
    if (toc.length === 0) return;

    const ids = toc.map((t) => t.id);
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // chọn entry đang visible gần top nhất
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        // đẩy vùng quan sát lên gần header (để active đúng khi vừa chạm)
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 1],
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <Container className="py-10 md:py-14">
      {/* Progress bar (Tailwind v4 canonical class) */}
      <div className="pointer-events-none fixed left-0 top-0 z-60 h-0.75 w-full bg-transparent">
        <div
          className="h-full bg-neonOrange transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        {/* MAIN */}
        <article className="min-w-0">
          {showHeader && (
            <header className="mb-6">
              {category && (
                <div className="mb-3 text-xs font-extrabold uppercase tracking-widest text-neonBlue">
                  {category}
                </div>
              )}

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                {title}
              </h1>

              {(dateFormatted || readingTime) && (
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-slate-500">
                  {dateFormatted && <span>{dateFormatted}</span>}
                  {readingTime && <span>• {readingTime}</span>}
                </div>
              )}
            </header>
          )}

          <Card className="p-6 md:p-8">
            <div
              className="
                prose prose-slate max-w-none
                prose-headings:font-extrabold
                prose-headings:tracking-tight
                prose-h2:text-2xl prose-h3:text-xl
                prose-p:leading-relaxed
                prose-a:font-bold prose-a:text-neonBlue prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900
                prose-blockquote:border-l-[4px]
                prose-blockquote:border-l-neonOrange
                prose-blockquote:bg-orange-50/50
                prose-blockquote:pl-4
                prose-code:rounded
                prose-code:bg-slate-100
                prose-code:px-1
                prose-code:py-0.5
                prose-pre:bg-slate-900
                prose-pre:text-slate-100
              "
              dangerouslySetInnerHTML={{ __html: htmlWithIds }}
            />
          </Card>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <footer className="mt-7">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="rounded-full border border-borderSoft bg-white px-3 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </footer>
          )}
        </article>

        {/* SIDEBAR TOC */}
        <aside className="hidden lg:block">
          {toc.length > 0 && (
            <div className="sticky top-24 rounded-2xl border border-borderSoft bg-white p-5 shadow-sm">
              <div className="text-sm font-extrabold text-slate-900">Mục lục</div>

              <nav className="mt-4 space-y-2 text-sm font-semibold text-slate-700">
                {toc.map((it) => {
                  const isActive = it.id === activeId;
                  return (
                    <a
                      key={it.id}
                      href={`#${it.id}`}
                      className={[
                        "block rounded-lg px-2 py-1 transition hover:text-neonOrange",
                        it.level === 3 ? "pl-5 text-[13px] text-slate-600" : "",
                        isActive ? "bg-neonOrange/10 text-neonOrange" : "",
                      ].join(" ")}
                    >
                      {it.text}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-5 rounded-xl bg-mmo px-3 py-2 text-xs font-semibold text-slate-600">
                Tip: bấm mục lục để nhảy nhanh.
              </div>
            </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
