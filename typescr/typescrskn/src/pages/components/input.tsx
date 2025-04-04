import React from "react";

type InputSize = "small" | "medium" | "large";
type InputColor = "primary" | "secondary";

interface InputProps {
  size: InputSize;
  color: InputColor;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  const { size, color, placeholder, value, onChange } = props;
  const defaultClass = "flex items-center border px-4 py-2 rounded focus:outline-none";

  const classes = {
    colors: {
      primary: "border-blue-500 focus:ring-blue-500",
      secondary: "border-gray-400 focus:ring-gray-400",
    },
    sizes: {
      small: "text-sm h-8",
      medium: "text-base h-10",
      large: "text-lg h-12",
    },
  };

  return (
    <input
      type="text"
      className={`${defaultClass} ${classes.sizes[size]} ${classes.colors[color]}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};