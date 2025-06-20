import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  extraStyle?: string;
}

// Default styles for the input
// "bg-gray-600/50 border border-transparent text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const defaultStyle =
  "px-4 py-2  placeholder:text-white/60 placeholder:font-semibold rounded-lg";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ extraStyle, ...props }, ref) => {
    return (
      <input
        ref={ref} // Attach the ref from React Hook Form
        className={`${defaultStyle} ${extraStyle}`}
        {...props} // Spread all other props
      />
    );
  }
);

// Add a display name for easier debugging in React DevTools
Input.displayName = "Input";

export default Input;
