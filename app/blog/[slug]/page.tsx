import Header from "@/components/Header";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = { params: { slug: string } };

// ✅ Optional: build static pages for all posts (good for SEO)
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogDetail({ params }: Props) {
  // ✅ Read from markdown
  let post: Awaited<ReturnType<typeof getPostBySlug>> | null = null;

  try {
    post = await getPostBySlug(params.slug);
  } catch {
    post = null;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-mmo text-slate-900">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Không tìm thấy bài viết
          </h1>
          <Link
            className="mt-4 inline-block font-bold text-neonBlue transition hover:text-neonOrange"
            href="/blog"
          >
            ← Quay lại Blog
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mmo text-slate-900">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-14">
        <Link
          className="font-bold text-neonBlue transition hover:text-neonOrange"
          href="/blog"
        >
          ← Quay lại Blog
        </Link>

        <h1 className="mt-5 text-3xl font-extrabold text-slate-900">
          {post.title}
        </h1>

        <div className="mt-2 text-sm font-semibold text-slate-500">
          {post.date}
          {post.tag ? (
            <span className="ml-2 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-extrabold text-slate-700">
              {post.tag}
            </span>
          ) : null}
        </div>

        <article className="prose prose-slate mt-6 max-w-none rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </main>
    </div>
  );
}
import Header from "@/components/Header";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = { params: { slug: string } };

// ✅ Optional: build static pages for all posts (good for SEO)
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogDetail({ params }: Props) {
  // ✅ Read from markdown
  let post: Awaited<ReturnType<typeof getPostBySlug>> | null = null;

  try {
    post = await getPostBySlug(params.slug);
  } catch {
    post = null;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-mmo text-slate-900">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Không tìm thấy bài viết
          </h1>
          <Link
            className="mt-4 inline-block font-bold text-neonBlue transition hover:text-neonOrange"
            href="/blog"
          >
            ← Quay lại Blog
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mmo text-slate-900">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-14">
        <Link
          className="font-bold text-neonBlue transition hover:text-neonOrange"
          href="/blog"
        >
          ← Quay lại Blog
        </Link>

        <h1 className="mt-5 text-3xl font-extrabold text-slate-900">
          {post.title}
        </h1>

        <div className="mt-2 text-sm font-semibold text-slate-500">
          {post.date}
          {post.tag ? (
            <span className="ml-2 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-extrabold text-slate-700">
              {post.tag}
            </span>
          ) : null}
        </div>

        <article className="prose prose-slate mt-6 max-w-none rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </main>
    </div>
  );
}
