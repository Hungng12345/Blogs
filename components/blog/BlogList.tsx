import type { PostMeta } from "@/lib/posts";
import BlogListClient from "@/components/blog/BlogListClient";

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="rounded-3xl border border-borderSoft bg-white/60 p-4 shadow-sm backdrop-blur md:p-6">
      <BlogListClient posts={posts} />
    </div>
  );
}
