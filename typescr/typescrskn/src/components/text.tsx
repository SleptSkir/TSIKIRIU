import React from "react";

type TextSize = "small" | "medium" | "large";

type TextColor = "primary" | "secondary";

interface TextProps {
  size: TextSize;
  color: TextColor;
  content: string;
}

export const Text: React.FC<TextProps> = (props) => {
  const { size, color, content } = props;
  const defaultClass = "flex items-center";

  const classes = {
    colors: {
      primary: "text-blue-600",
      secondary: "text-gray-800",
    },
    sizes: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
  };

  return (
    <div
      className={`${defaultClass} ${classes.sizes[size]} ${classes.colors[color]}`}
    >
      {content}
    </div>
  );
};