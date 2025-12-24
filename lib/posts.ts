import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/* =====================
   Types
===================== */
export type Category = "Affiliate" | "Tool" | "Case Study" | "Anti-Scam";
export type Tag = "NEWBIE" | "CASE STUDY" | "SCAM";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: Category;
  tags: Tag[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

/* =====================
   Paths
===================== */
const postsDirectory = path.join(process.cwd(), "content/posts");

/* =====================
   Get all posts (list)
===================== */
export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        category: data.category as Category,
        tags: data.tags as Tag[],
      };
    });

  // ✅ sort newest first
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/* =====================
   Get single post
===================== */
export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    category: data.category as Category,
    tags: data.tags as Tag[],
    contentHtml: processed.toString(),
  };
}
