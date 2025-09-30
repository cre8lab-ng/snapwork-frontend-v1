import React from "react";

interface ShoppingCartProps {
  color?: string;
  size?: string;
  width?: string;
  height?: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  color = "currentColor",
  size = "16",
  width,
  height,
}) => {
  const iconSize = width || height || size;
  
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H4m3 8v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0h10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShoppingCart;