import type { PostMeta, PostTag } from "@/lib/posts/types";
import Pill from "@/components/ui/Pill";

function toneByTag(tag: PostTag) {
  if (tag === "SCAM") return "red";
  if (tag === "CASE STUDY") return "orange";
  return "blue";
}

export default function BlogMeta({ post }: { post: PostMeta }) {
  const primaryTag = (post.tag ?? post.tags?.[0]) as PostTag | undefined;

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {primaryTag && <Pill tone={toneByTag(primaryTag)}>{primaryTag}</Pill>}
        {post.category && <Pill tone="neutral">{post.category}</Pill>}
      </div>
      <div className="shrink-0 text-xs font-semibold text-slate-500">{post.date}</div>
    </div>
  );
}
