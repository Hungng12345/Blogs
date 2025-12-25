// D:\Blogs\simple-blog\components\ui\Card.tsx
import * as React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;

  /** nếu muốn Card = Link / section / article... mà không tạo thêm div */
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

function cx(...arr: Array<string | undefined | false>) {
  return arr.filter(Boolean).join(" ");
}

export default function Card({ children, className, asChild = false, ...rest }: Props) {
  const base =
    "rounded-3xl border border-borderSoft bg-white shadow-sm " +
    "transition hover:shadow-md";

  if (asChild) {
    const onlyChild = React.Children.only(children) as React.ReactElement<{
      className?: string;
    }>;

    return React.cloneElement(onlyChild, {
      ...rest,
      className: cx(base, onlyChild.props.className, className),
    });
  }

  return (
    <div {...rest} className={cx(base, className)}>
      {children}
    </div>
  );
}
