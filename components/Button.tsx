import React, { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondry" | "logout";
  text: string;
  type: "button" | "submit";
  onclick?: () => void;
  size?: "sm" | "md" | "lg";
  extraStyle?: string;

  startIcon?: ReactElement;
}

const style: Record<string, string> = {
  primary: "bg-persian-blue-500 hover:bg-persian-blue-600 ",
  secondry: "bg-persian-blue-200 hover:bg-persian-blue-300",
  logout: "bg-red-500 hover:bg-red-700",
  // "sm": "text-sm",
  // "md": "text-md",
  // "lg": "text-lg"
};

const defaultStyle = `py-2 px-4 rounded-lg outline-none focus:outline-none flex items-center gap-2 `;

const Button = ({
  variant,
  text,
  onclick,
  extraStyle,
  startIcon,
}: ButtonProps) => {
  return (
    <>
      <button
        onClick={onclick}
        className={`${style[variant]} ${defaultStyle} ${extraStyle}`}
      >
        {startIcon}
        {text}
      </button>
    </>
  );
};

export default Button;
