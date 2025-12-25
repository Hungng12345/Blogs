export type PostTag = "NEWBIE" | "CASE STUDY" | "SCAM";
export type PostCategory = "Affiliate" | "Tool" | "Case Study" | "Anti-Scam";

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt?: string;
  category?: PostCategory;
  tag?: PostTag;      // single tag
  tags?: PostTag[];   // optional multi tags
};

export type PostDetail = PostMeta & {
  contentHtml: string;
};
