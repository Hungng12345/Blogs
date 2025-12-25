// D:\Blogs\simple-blog\components\ui\Pill.tsx
import * as React from "react";

type Tone = "neutral" | "blue" | "orange" | "red";
type Size = "sm" | "md";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;

  /** dùng khi muốn Pill bọc Link/Button mà không tạo thêm span */
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

function cx(...arr: Array<string | undefined | false>) {
  return arr.filter(Boolean).join(" ");
}

export default function Pill({
  children,
  tone = "neutral",
  size = "sm",
  className,
  asChild = false,
  ...rest
}: Props) {
  const toneMap: Record<Tone, string> = {
    neutral: "border-borderSoft bg-white text-slate-700",
    blue: "border-neonBlue/25 bg-neonBlue/10 text-neonBlue",
    orange: "border-neonOrange/25 bg-neonOrange/10 text-neonOrange",
    red: "border-red-200 bg-red-50 text-red-600",
  };

  const sizeMap: Record<Size, string> = {
    sm: "px-3 py-1 text-xs",
    md: "px-3.5 py-1.5 text-[13px]",
  };

  const base =
    "inline-flex items-center gap-1 rounded-full border font-extrabold transition " +
    "hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neonOrange/25";

  // ✅ asChild: render wrapper-less element (useful for Link)
  if (asChild) {
    const onlyChild = React.Children.only(children) as React.ReactElement<
      { className?: string } & Record<string, unknown>
    >;

    return React.cloneElement(onlyChild, {
      ...rest,
      className: cx(base, toneMap[tone], sizeMap[size], onlyChild.props.className, className),
    });
  }

  return (
    <span {...rest} className={cx(base, toneMap[tone], sizeMap[size], className)}>
      {children}
    </span>
  );
}
