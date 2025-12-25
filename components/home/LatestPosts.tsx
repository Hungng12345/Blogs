import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/lib/posts";

/**
 * Latest posts on Homepage
 * Server Component → SEO tốt
 */
export default async function LatestPosts() {
  const posts = await getAllPosts();

  // Lấy 3 bài mới nhất
  const latestPosts = posts.slice(0, 3);

  return (
    <section aria-labelledby="latest-posts-heading">
      <Container>
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2
              id="latest-posts-heading"
              className="text-2xl font-extrabold tracking-tight md:text-3xl"
            >
              Bài viết mới nhất
            </h2>
            <p className="mt-2 max-w-xl text-sm font-medium text-slate-600">
              Kiến thức MMO thực chiến, cập nhật xu hướng kiếm tiền online mới
              nhất.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden shrink-0 text-sm font-bold text-neonBlue hover:underline md:block"
          >
            Xem tất cả →
          </Link>
        </div>

        {/* List posts */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Card
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex-1">
                {/* Meta */}
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-neonBlue">
                  {post.category || "MMO"}
                </div>

                {/* Title */}
                <h3 className="line-clamp-2 text-lg font-extrabold leading-snug transition group-hover:text-neonOrange">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="mt-3 line-clamp-3 text-sm font-medium text-slate-600">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{post.dateFormatted}</span>
                <span className="text-neonBlue group-hover:underline">
                  Đọc tiếp →
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-block text-sm font-bold text-neonBlue hover:underline"
          >
            Xem tất cả bài viết →
          </Link>
        </div>
      </Container>
    </section>
  );
}
