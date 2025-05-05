import React from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonColor = "primary" | "secondary";

interface ButtonProps {
  size: ButtonSize;
  color: ButtonColor;
  title: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { size, color, title } = props;
  const defaultClass = "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2";

  const classes = {
    colors: {
      primary: {
        button: "bg-blue-400",
        text: "text-red",
      },
      secondary: {
        button: "bg-red-500",
        text: "text-white",
      },
    },
    sizes: {
      small: "rounded-[100px] font-sm",
      medium: "rounded-[14px] font-base",
      large: "rounded-[16px] font-base min-h-[56px]",
    },
  };

  return (
    <div
      className={
        defaultClass + " " + classes.sizes[size] + " " + classes.colors[color].button
      }
    >
      <div className={classes.colors[color].text}>{title}</div>
    </div>
  );
};