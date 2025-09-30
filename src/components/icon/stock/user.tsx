import React from "react";

interface UserProps {
  color?: string;
  size?: string;
  width?: string;
  height?: string;
}

const User: React.FC<UserProps> = ({
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
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default User;