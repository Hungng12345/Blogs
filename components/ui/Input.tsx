// components/ui/Input.tsx
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input(props: Props) {
  const { className = "", ...rest } = props;

  return (
    <input
      {...rest}
      className={[
        "w-full rounded-2xl border border-borderSoft bg-white px-4 py-3 text-base font-semibold text-slate-900 shadow-sm outline-none",
        "placeholder:text-slate-400 focus:border-neonOrange focus:ring-2 focus:ring-neonOrange/20",
        className,
      ].join(" ")}
    />
  );
}
