import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import sanitizeHtml, { type IOptions } from "sanitize-html";

export type PostTag = "NEWBIE" | "CASE STUDY" | "SCAM";
export type PostCategory = "Affiliate" | "Tool" | "Case Study" | "Anti-Scam";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;

  /** YYYY-MM-DD (khuyến nghị) */
  date?: string;
  /** dạng hiển thị vi-VN */
  dateFormatted?: string;

  excerpt?: string;
  category?: PostCategory;

  /** ✅ luôn là array để tránh bug tag vs tags */
  tags: PostTag[];

  /** /public/... hoặc URL */
  coverImage?: string;

  /** "x phút đọc" */
  readingTime?: string;
};

export type PostFull = PostMeta & {
  contentHtml: string;
};

function safeReadDir(dir: string): string[] {
  try {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

function isPostTag(x: string): x is PostTag {
  return x === "NEWBIE" || x === "CASE STUDY" || x === "SCAM";
}

function isPostCategory(x: string): x is PostCategory {
  return x === "Affiliate" || x === "Tool" || x === "Case Study" || x === "Anti-Scam";
}

function formatDateVN(dateInput?: string | Date): string | undefined {
  try {
    if (!dateInput) return undefined;

    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (Number.isNaN(d.getTime())) return undefined;

    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return undefined;
  }
}

/** Cắt excerpt từ markdown nếu frontmatter chưa có */
function deriveExcerpt(md: string, max = 160): string {
  if (!md) return "";

  let t = md;

  // code fences
  t = t.replace(/```[\s\S]*?```/g, "");
  // images
  t = t.replace(/!\[.*?\]\(.*?\)/g, "");
  // links [text](url) -> text
  t = t.replace(/\[(.*?)\]\(.*?\)/g, "$1");
  // headings
  t = t.replace(/^#+\s*/gm, "");
  // blockquotes
  t = t.replace(/^>\s*/gm, "");
  // inline code
  t = t.replace(/`([^`]+)`/g, "$1");
  // bullets
  t = t.replace(/^\s*[-*+]\s+/gm, "");
  // whitespace
  t = t.replace(/\s+/g, " ").trim();

  const first = t.split(/\n\s*\n/)[0]?.trim() ?? "";
  if (first.length <= max) return first;

  return first.slice(0, max).trim().replace(/\s+\S*$/, "") + "...";
}

/** Ước lượng thời gian đọc */
function estimateReadingTime(md: string): string {
  if (!md) return "1 phút đọc";

  const stripped = md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[#>*-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = stripped ? stripped.split(" ").length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} phút đọc`;
}

function getPostFiles(): string[] {
  return safeReadDir(POSTS_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

/** tags hỗ trợ: tags: ["NEWBIE"] | tags: "NEWBIE" | tags: ["newbie"] */
function normalizeTags(raw: unknown): PostTag[] {
  const arr: string[] =
    Array.isArray(raw) ? raw.map((v) => String(v)) : typeof raw === "string" ? [raw] : [];

  const cleaned = arr
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .map((s) => (s === "CASESTUDY" ? "CASE STUDY" : s));

  const valid = cleaned.filter(isPostTag);
  return valid.length ? valid : ["NEWBIE"];
}

function normalizeCategory(raw: unknown): PostCategory | undefined {
  if (typeof raw !== "string") return undefined;

  const c = raw.trim();
  return isPostCategory(c) ? c : undefined;
}

function normalizeDate(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const s = raw.trim();
  if (!s) return undefined;

  // accept "YYYY-MM-DD" or any parseable date, but store as original
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return undefined;

  return s;
}

type FrontMatter = Record<string, unknown>;

function buildMeta(slug: string, data: FrontMatter, content: string): PostMeta {
  const title =
    typeof data.title === "string" && data.title.trim() ? data.title.trim() : slug;

  const date = normalizeDate(data.date);
  const dateFormatted = formatDateVN(date);

  const excerpt =
    typeof data.excerpt === "string" && data.excerpt.trim()
      ? data.excerpt.trim()
      : deriveExcerpt(content);

  const category = normalizeCategory(data.category);
  const tags = normalizeTags(data.tags);

  const coverImage = typeof data.coverImage === "string" ? data.coverImage.trim() : undefined;
  const readingTime = estimateReadingTime(content);

  return { slug, title, date, dateFormatted, excerpt, category, tags, coverImage, readingTime };
}

/** ✅ sync: dùng tốt trong Server Components */
export function getAllPosts(): PostMeta[] {
  const files = getPostFiles();

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const parsed = matter(raw);

    return buildMeta(slug, parsed.data as FrontMatter, String(parsed.content ?? ""));
  });

  // sort date desc, fallback slug
  posts.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    if (db !== da) return db - da;
    return a.slug.localeCompare(b.slug);
  });

  return posts;
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((f) => f.replace(/\.mdx?$/, ""));
}

/** tìm đúng file slug.md hoặc slug.mdx */
function resolvePostPath(slug: string): string | null {
  if (!slug || !slug.trim()) return null;

  const filePathMd = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(filePathMd)) return filePathMd;

  const filePathMdx = path.join(POSTS_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePathMdx)) return filePathMdx;

  return null;
}

/** sanitize an toàn + tự thêm rel cho link external */
function sanitizeContent(htmlRaw: string): string {
  const opts: IOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "blockquote",
      "pre",
      "code",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "loading"],
      a: ["href", "name", "target", "rel"],
      code: ["class"],
    },
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
      a: ["http", "https", "mailto"],
    },
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const isExternal =
          typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://"));

        if (isExternal) {
          const rel = attribs.rel ? String(attribs.rel) : "";
          const merged = Array.from(new Set(["noopener", "noreferrer", ...rel.split(" ").filter(Boolean)])).join(" ");

          return {
            tagName,
            attribs: {
              ...attribs,
              target: "_blank",
              rel: merged,
            },
          };
        }

        return { tagName, attribs };
      },
      img: (tagName, attribs) => {
        // set loading lazy default
        return {
          tagName,
          attribs: {
            loading: "lazy",
            ...attribs,
          },
        };
      },
    },
  };

  return sanitizeHtml(htmlRaw, opts);
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  const fullPath = resolvePostPath(slug);
  if (!fullPath) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);

  const contentMd = String(parsed.content ?? "");

  // markdown -> html
  const processed = await remark().use(html).process(contentMd);
  const contentHtmlRaw = String(processed);

  const contentHtml = sanitizeContent(contentHtmlRaw);
  const meta = buildMeta(slug, parsed.data as FrontMatter, contentMd);

  return { ...meta, contentHtml };
}
