import React from "react";

export const Text = (props) => {
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
