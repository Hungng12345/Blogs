export type PostLabel = "NEWBIE" | "CASE STUDY" | "SCAM";

export type Post = {
  slug: string;
  label: PostLabel;
  title: string;
  desc: string;
};

/* ===================== BLOG POSTS ===================== */
export const POSTS: Post[] = [
  {
    slug: "mmo-la-gi",
    label: "NEWBIE",
    title: "MMO là gì? Bắt đầu đúng cách",
    desc: "Tổng quan mô hình kiếm tiền online, giúp người mới hiểu đúng và tránh ảo tưởng ban đầu.",
  },
  {
    slug: "affiliate-2025",
    label: "CASE STUDY",
    title: "Affiliate 2025 còn sống không?",
    desc: "Phân tích thực tế mô hình affiliate, cơ hội còn lại và những rủi ro cần tránh.",
  },
  {
    slug: "5-dau-hieu-scam",
    label: "SCAM",
    title: "5 dấu hiệu nhận biết dự án lừa đảo",
    desc: "Những tín hiệu phổ biến giúp bạn tránh mất tiền khi tham gia MMO.",
  },
];

/* ===================== HERO STATS ===================== */
export const STATS = [
  {
    title: "Thực chiến",
    titleClass: "text-neonOrange",
    desc: "Case study có số liệu rõ ràng",
  },
  {
    title: "An toàn",
    titleClass: "text-neonBlue",
    desc: "Cảnh báo scam theo xu hướng mới",
  },
  {
    title: "Tăng trưởng",
    titleClass: "text-neonOrange",
    desc: "Tư duy dài hạn và bền vững",
  },
];

/* ===================== COMMUNITY ===================== */
export const COMMUNITY_LINKS = [
  { label: "Facebook Group", href: "#" },
  { label: "Telegram Channel", href: "#" },
  { label: "Discord Server", href: "#" },
  { label: "Zalo MMO Blogs", href: "#" },
];

/* ===================== TAGS ===================== */
export const TAGS = [
  "Affiliate",
  "Tool",
  "Case Study",
  "Anti-Scam",
];
