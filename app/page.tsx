import Link from "next/link";
import Header from "../components/Header";
import { COMMUNITY_LINKS, STATS, TAGS } from "../components/home/data";
import { CommunityLink, Glow, Pill, PostCard, Section, StatCard } from "../components/home/ui";
import { getAllPosts } from "../lib/posts";

type PostLabel = "NEWBIE" | "CASE STUDY" | "SCAM";

function toLabel(tag?: string): PostLabel {
  const t = (tag || "").toUpperCase().trim();
  if (t === "CASE STUDY") return "CASE STUDY";
  if (t === "SCAM") return "SCAM";
  return "NEWBIE";
}

export default function HomePage() {
  // ✅ Single source of truth: markdown in /content/posts
  const latestPosts = getAllPosts()
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-mmo text-slate-900">
      <Header />

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Glow />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-extrabold tracking-widest text-neonBlue shadow-sm">
              MMO · AFFILIATE · TOOL
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
              Kiếm tiền Online
              <br />
              <span className="text-neonOrange">Có chiến lược – Có kiểm chứng</span>
            </h1>

            <p className="mt-5 max-w-xl text-[17px] font-semibold leading-relaxed text-slate-700 md:text-lg">
              MMO Blogs chia sẻ kiến thức thực chiến, công cụ kiếm tiền online, case study thật và cảnh báo scam
              cho cộng đồng Việt.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="rounded-2xl bg-neonOrange px-6 py-3 text-sm font-extrabold text-white shadow-card transition hover:-translate-y-0.5 hover:brightness-95"
              >
                Xem bài viết
              </Link>

              <a
                href="#community"
                className="rounded-2xl border border-neonBlue/25 bg-white px-6 py-3 text-sm font-extrabold text-neonBlue shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Tham gia cộng đồng
              </a>

              <a
                href="#about"
                className="rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Tìm hiểu thêm
              </a>
            </div>

            <div className="mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {STATS.map((s) => (
                <StatCard
                  key={s.title}
                  title={s.title.replace(/^[^a-zA-Z0-9]+/, "")}
                  titleClass={s.titleClass}
                  desc={s.desc}
                />
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="hidden md:flex md:justify-end">
            <div className="relative ml-auto">
              <div className="absolute -inset-8 rounded-[28px] bg-gradient-to-br from-neonBlue/15 to-neonOrange/15 blur-2xl" />
              <div className="relative rounded-[28px] border border-gray-200 bg-white p-4 shadow-card">
                <img
                  src="/logo.jpg"
                  alt="MMO Graphic"
                  className="h-auto w-[340px] rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <Section id="blog" className="py-12">
        <div className="mb-6 flex items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Bài viết mới</h2>
            <p className="mt-1 text-[15px] font-semibold text-slate-600 md:text-base">
              Chọn đúng hướng – tránh sai lầm – tăng tốc.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 md:inline-flex"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((p) => (
            <PostCard
              key={p.slug}
              post={{
                slug: p.slug,
                label: toLabel(p.tag),
                title: p.title,
                desc: p.excerpt || "",
              }}
            />
          ))}
        </div>
      </Section>

      {/* COMMUNITY */}
      <Section id="community" className="py-12">
        <div className="rounded-[32px] border border-gray-200 bg-white/70 p-8 text-center shadow-sm backdrop-blur md:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Cộng đồng MMO Blogs</h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] font-semibold text-slate-600 md:text-base">
            Kết nối – học hỏi – cập nhật kiến thức MMO mỗi ngày.
          </p>

          <div className="mx-auto mt-7 grid max-w-md gap-3">
            {COMMUNITY_LINKS.map((l) => (
              <CommunityLink key={l.label} href={l.href} label={l.label} />
            ))}
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" className="py-12">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm md:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight">Giới thiệu</h2>
            <p className="mt-3 font-semibold leading-relaxed text-slate-700">
              MMO Blogs tập trung vào kiến thức kiếm tiền online theo hướng an toàn, bền vững: hiểu mô hình,
              kiểm tra rủi ro, chọn công cụ đúng, tránh scam.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <Pill key={t} text={t} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm md:p-8">
            <h3 className="text-xl font-extrabold tracking-tight">Bạn sẽ nhận được gì?</h3>

            <ul className="mt-4 space-y-3 font-semibold text-slate-700">
              {[
                "Lộ trình cho người mới: bắt đầu từ số 0.",
                "Case study thực tế và checklist tránh sai.",
                "Gợi ý công cụ và cách dùng an toàn.",
                "Cảnh báo scam theo xu hướng tại Việt Nam.",
              ].map((text) => (
                <li key={text} className="flex gap-2">
                  <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-neonOrange" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-7 text-center text-sm font-semibold text-slate-600">
        © 2025 MMO Blogs – Knowledge • Tools • Growth
      </footer>
    </div>
  );
}
