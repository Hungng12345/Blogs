import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { PostCategory, PostDetail, PostMeta, PostTag } from "./types";

function asTag(v: unknown): PostTag | undefined {
  const t = String(v ?? "").toUpperCase().trim();
  if (t === "NEWBIE" || t === "CASE STUDY" || t === "SCAM") return t;
  return undefined;
}

function asCategory(v: unknown): PostCategory | undefined {
  const c = String(v ?? "").trim() as PostCategory;
  if (["Affiliate", "Tool", "Case Study", "Anti-Scam"].includes(c)) return c;
  return undefined;
}

export function parseMeta(slug: string, raw: string): PostMeta {
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  const title = String(data.title ?? slug);
  const date = String(data.date ?? "1970-01-01");
  const excerpt = data.excerpt ? String(data.excerpt) : undefined;

  const category = asCategory(data.category);
  const tag = asTag(data.tag);

  const tags = Array.isArray(data.tags)
    ? (data.tags.map((x: unknown) => asTag(x)).filter(Boolean) as PostTag[])
    : undefined;

  return { slug, title, date, excerpt, category, tag, tags };
}

export async function parseDetail(slug: string, raw: string): Promise<PostDetail> {
  const parsed = matter(raw);
  const meta = parseMeta(slug, raw);

  const processed = await remark().use(html).process(parsed.content);

  return {
    ...meta,
    contentHtml: processed.toString(),
  };
}
