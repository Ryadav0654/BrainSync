import React from "react";

const Tags = ({ text }: { text: string }) => {
  return (
    <span className="bg-persian-blue-100/20 border-2 border-persian-blue-500/10 py-1 px-2 text-sm rounded-full">
      {text}
    </span>
  );
};

export default Tags;
