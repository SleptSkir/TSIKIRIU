import React from "react";
export const Button = (props) => {
  const { size, color, title } = props;
  const defaultClass =
    "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2";

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

  console.log("sdcsdv", classes.colors[color]);
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
