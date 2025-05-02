import { MouseEvent, CSSProperties, useEffect, useState } from "react";

interface IconProps {
  name:
    | string
    | {
        [key: number]: string;
      }
    | undefined;
  className?: string;
  color?: string;
  size?: string;
  width?: string;
  height?: string;
  style?: CSSProperties;
  onClick?: (
    e?: MouseEvent<HTMLSpanElement>
  ) => void | Promise<void> | undefined;
}

const Icon = ({
  name,
  className,
  color,
  size,
  width,
  height,
  onClick,
  style,
  ...restProps
}: IconProps) => {
  const [ImageComponent, setImageComponent] =
    useState<React.ElementType | null>(null);

  useEffect(() => {
    if (!name) return;

    const loadIcon = async () => {
      try {
        const iconModule = await import(`./stock/${name}`);
        setImageComponent(() => iconModule.default);
      } catch {
        setImageComponent(null);
      }
    };

    loadIcon();
  }, [name]);

  if (!ImageComponent) return null;

  return (
    <span className={className} style={style} onClick={onClick}>
      <ImageComponent
        aria-label={typeof name === "string" ? name : "icon"}
        color={color}
        size={size}
        width={width}
        height={height}
        {...restProps}
      />
    </span>
  );
};

export default Icon;
