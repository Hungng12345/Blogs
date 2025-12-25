import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Bài viết thực chiến MMO: affiliate, tools, case study và cảnh báo scam. Tập trung an toàn, bền vững.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-5xl py-10">
      <header className="mb-7">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Blog MMO
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] font-semibold text-slate-600 md:text-base">
          Thực chiến – hạn chế rủi ro – ưu tiên bền vững.
        </p>
      </header>

      <BlogList posts={posts} />
    </section>
  );
}
