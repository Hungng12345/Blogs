import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function Button({ children, href, variant = "primary", className = "" }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition";
  const styles =
    variant === "primary"
      ? "bg-neonOrange text-white shadow-card hover:brightness-95"
      : "border border-borderSoft bg-white text-slate-900 hover:bg-slate-50";

  if (href) return <Link href={href} className={`${base} ${styles} ${className}`}>{children}</Link>;
  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}
