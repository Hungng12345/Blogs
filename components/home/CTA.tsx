import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function CTA() {
  return (
    <section id="community" className="py-12">
      <Container>
        <Card className="bg-white/70 p-9 text-center backdrop-blur">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Cộng đồng MMO Blogs
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] font-semibold text-slate-600 md:text-base">
            Kết nối – học hỏi – cập nhật kiến thức MMO mỗi ngày.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/blog">Đọc bài mới</Button>
            <Button href="/#about" variant="ghost">Giới thiệu</Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
