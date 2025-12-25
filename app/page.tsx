import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import LatestPosts from "@/components/home/LatestPosts";
import CTA from "@/components/home/CTA";

/**
 * SEO riêng cho Homepage
 * Rất quan trọng với blog MMO
 */
export const metadata: Metadata = {
  title: "Kiếm Tiền Online MMO – Blog Thực Chiến",
  description:
    "Chia sẻ kiến thức kiếm tiền online MMO thực chiến: affiliate marketing, tool MMO, case study thật và cảnh báo scam.",
  openGraph: {
    title: "MMO Blogs – Kiếm Tiền Online Thực Chiến",
    description:
      "Blog MMO chia sẻ affiliate, tool, case study và kinh nghiệm kiếm tiền online thực tế.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* HERO – ấn tượng đầu tiên */}
      <Hero />

      {/* GIÁ TRỊ / LỢI ÍCH */}
      <section className="mt-20">
        <Features />
      </section>

      {/* BÀI VIẾT MỚI NHẤT */}
      <section className="mt-24">
        <LatestPosts />
      </section>

      {/* CALL TO ACTION */}
      <section className="mt-24">
        <CTA />
      </section>
    </>
  );
}
