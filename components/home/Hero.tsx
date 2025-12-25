import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden py-12 md:py-16"
    >
      {/* subtle background gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-white/80 to-transparent"
        aria-hidden="true"
      />

      <Container className="grid items-center gap-10 md:grid-cols-2">
        {/* --- Left: content --- */}
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-borderSoft bg-white px-3 py-1.5 text-xs font-extrabold tracking-widest text-neonBlue shadow-sm">
            MMO · AFFILIATE · TOOL
          </div>

          <h1
            id="hero-heading"
            className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl"
          >
            Kiếm tiền Online
            <br />
            <span className="text-neonOrange">Có chiến lược — Có kiểm chứng</span>
          </h1>

          <p className="mt-5 max-w-xl text-[17px] font-semibold leading-relaxed text-slate-700 md:text-lg">
            MMO Blogs chia sẻ kiến thức thực chiến, công cụ kiếm tiền online,
            case study thật và cảnh báo scam cho cộng đồng Việt.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/blog" aria-label="Xem bài viết">
              Xem bài viết
            </Button>

            <Button variant="outline" href="/#community" aria-label="Tham gia cộng đồng">
              Tham gia cộng đồng
            </Button>

            <Button variant="outline" href="/#about" aria-label="Tìm hiểu thêm">
              Tìm hiểu thêm
            </Button>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Thực chiến", desc: "Case study có số liệu rõ ràng" },
              { title: "An toàn", desc: "Cảnh báo scam theo xu hướng" },
              { title: "Tăng trưởng", desc: "Tư duy dài hạn & bền vững" },
            ].map((x) => (
              <Card key={x.title} className="p-4">
                <div className="text-sm font-extrabold">{x.title}</div>
                <div className="mt-1 text-xs font-semibold text-slate-600">
                  {x.desc}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* --- Right: decorative image with glow --- */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            {/* decorative glowing background */}
            <div
              className="absolute -inset-8 rounded-[28px] bg-gradient-to-br from-neonBlue/15 to-neonOrange/15 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative rounded-[28px] border border-borderSoft bg-white p-4 shadow-card">
              {/* Next/Image responsive - adjust sizes with Tailwind classes */}
              <Image
                src="/logo.jpg"
                alt="Minh họa MMO (logo)"
                width={680}
                height={680}
                priority
                className="w-[220px] sm:w-[280px] md:w-[340px] h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
