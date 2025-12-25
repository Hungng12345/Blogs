import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

const items = [
  { title: "Thực chiến", desc: "Bài viết ưu tiên trải nghiệm thật & checklist rõ ràng." },
  { title: "An toàn", desc: "Nhận diện scam, tránh mất tiền, ưu tiên bảo toàn vốn." },
  { title: "Tối ưu", desc: "Công cụ & quy trình giúp làm nhanh hơn – đúng hơn." },
];

export default function Features() {
  return (
    <section className="py-12">
      <Container>
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Giá trị bạn nhận được</h2>
        <p className="mt-2 max-w-2xl text-[15px] font-semibold text-slate-600 md:text-base">
          Học đúng — làm chắc — phát triển dài hạn.
        </p>

        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {items.map((i) => (
            <Card key={i.title} className="p-6">
              <div className="text-lg font-extrabold">{i.title}</div>
              <div className="mt-2 text-sm font-semibold text-slate-600">{i.desc}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
