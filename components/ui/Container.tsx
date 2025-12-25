// D:\Blogs\simple-blog\components\ui\Container.tsx
import * as React from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl";

type Props = {
  children: React.ReactNode;
  className?: string;

  /** đổi bề rộng container tùy trang */
  size?: ContainerSize;

  /** nếu muốn Container = section / main / header... mà không tạo div thừa */
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

function cx(...arr: Array<string | undefined | false>) {
  return arr.filter(Boolean).join(" ");
}

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export default function Container({
  children,
  className,
  size = "xl",
  asChild = false,
  ...rest
}: Props) {
  const base = cx("mx-auto w-full px-4", sizeMap[size]);

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
