"use client";
import React, { useState } from "react";
import ShareIcon from "./icons/ShareIcon";
import Tags from "./Tags";
import DeleteIcon from "./icons/DeleteIcon";
import DocumentIcon from "./icons/DocumentIcon";
import deleteBrain from "@/libs/actions/deleteBrain";
import Link from "next/link";
import DeleteConfirmation from "./DeletePopup";

interface CardProps {
  id: string;
  type: string;
  title: string;
  username: string;
  link: string;
  createdAt: Date;
  tags?: string[];
}

const Card = ({
  type,
  title,
  username,
  link,
  id,
  tags,
  createdAt,
}: CardProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  return (
    <div className="bg-slate-500/20 text-white md:max-w-[40vw] lg:max-w-[30vw] xl:max-w-[24vw] w-full px-5 py-4 rounded-xl max-h-84 shadow-lg shadow-persian-blue-300/50">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <DocumentIcon />
          <p className="font-semibold">{type.toUpperCase()}</p>
        </div>
        <div className="flex gap-3 items-center">
          <ShareIcon />
          <span
            className="cursor-pointer"
            onClick={() => setIsConfirmOpen(true)}
          >
            <DeleteIcon />
          </span>
        </div>
      </div>

      <div className="mt-4">
        <iframe
          className="w-full rounded-lg my-3 scrollbar-none"
          src={type === "Youtube" ? link.replace("watch?v=", "embed/") : link}
          title="media"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-3">
        <Link href={link} target="_blank">
          <h1 className="w-full text-xl subpixel-antialiased truncate text-white font-semibold overflow-ellipsis">
            {title}
          </h1>
        </Link>
        <div className="flex justify-between text-white/60 text-sm mb-2">
          <p>Author: {username}</p>
          <p>{new Date(createdAt).toDateString()}</p>
        </div>
        <div className="flex gap-3 mt-2 overflow-x-scroll scrollbar-none">
          {tags?.map((text) => (
            <Tags key={text} text={text} />
          ))}
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={async () => {
          await deleteBrain(id);
          setIsConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default Card;
