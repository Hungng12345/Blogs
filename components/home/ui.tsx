import Link from "next/link";

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </section>
  );
}

/** Soft light glow – rất nhẹ, không làm bẩn nền */
export function Glow() {
  return (
    <>
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-neonBlue/10 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-0 h-80 w-80 rounded-full bg-neonOrange/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neonBlue/5 blur-[120px]" />
    </>
  );
}

export function StatCard({
  title,
  titleClass,
  desc,
}: {
  title: string;
  titleClass: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/90 p-4 shadow-sm backdrop-blur">
      <div className={["text-base font-extrabold tracking-tight", titleClass].join(" ")}>
        {title}
      </div>
      <div className="mt-1 text-[13px] font-semibold leading-relaxed text-slate-600">
        {desc}
      </div>
    </div>
  );
}

type PostLabel = "NEWBIE" | "CASE STUDY" | "SCAM";
type Post = { slug: string; label: PostLabel; title: string; desc: string };

function tagStyle(label: PostLabel) {
  if (label === "NEWBIE") return "text-neonBlue border-neonBlue/25 bg-neonBlue/10";
  if (label === "CASE STUDY") return "text-neonOrange border-neonOrange/25 bg-neonOrange/10";
  return "text-red-600 border-red-200 bg-red-50";
}

function hoverRing(label: PostLabel) {
  if (label === "SCAM") return "hover:ring-red-200/60";
  return "hover:ring-neonOrange/20";
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article
      className={[
        // ✅ card cao bằng nhau
        "group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition",
        "hover:-translate-y-0.5 hover:shadow-md hover:ring-4",
        hoverRing(post.label),
      ].join(" ")}
    >
      {/* top row */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={[
            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold tracking-wide",
            tagStyle(post.label),
          ].join(" ")}
        >
          {post.label}
        </span>

        <span className="text-xs font-semibold text-slate-500">~5 phút đọc</span>
      </div>

      {/* title */}
      <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-slate-900 transition group-hover:text-neonOrange">
        {post.title}
      </h3>

      {/* desc - clamp để card đều */}
      <p className="mt-2 line-clamp-3 text-[15px] font-semibold leading-relaxed text-slate-600">
        {post.desc}
      </p>

      {/* ✅ đẩy footer xuống đáy */}
      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-extrabold text-slate-900 transition hover:text-neonOrange"
          >
            Đọc tiếp →
          </Link>
          <span className="text-xs font-semibold text-slate-500">Hôm nay</span>
        </div>
      </div>
    </article>
  );
}

export function CommunityLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-black/5 bg-white px-5 py-4 text-sm font-extrabold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {label}
    </a>
  );
}

export function Pill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-black/5 bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
      {text}
    </span>
  );
}
