import React from "react";

interface SearchProps {
  color?: string;
  size?: string;
  width?: string;
  height?: string;
}

const Search: React.FC<SearchProps> = ({
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Search;