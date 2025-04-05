"use client";
import React from "react";
import Button from "./Button";
import ProfileCard from "./ProfileCard";
import DocumentIcon from "./icons/DocumentIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import TwitterIcon from "./icons/TwitterIcon";
import QuestionIcon from "./icons/QuestionIcon";
import HomeIcon from "./icons/HomeIcon";
import ShareIcon from "./icons/ShareIcon";
import CrossIcon from "./icons/CrossIcon";
import PlusIcon from "./icons/PlusIcon";
import { useRouter, useSearchParams } from "next/navigation";
import LinkIcon from "./icons/LinkIcon";

const MobileSidebar = ({
  handleOpenModal,
  setIsOpen,
}: {
  handleOpenModal: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
    const searchParams = useSearchParams();
    // console.log("contents in sidebar", contents)
    const handleFilter = (type: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('search', type);
      router.push(`?${params.toString()}`);
    };
  return (
    <div className=" px-6 py-4 min-h-screen w-full flex flex-col justify-between  bg-slate-900/90 border-r-2 border-white/40">
      <div className="flex flex-col gap-4 mt-4 text-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white">Second Brain</h1>
          <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <CrossIcon />
          </div>
        </div>
        <Button
          type="button"
          variant="secondry"
          text="Home"
          onclick={() => {
            setIsOpen(false);
            router.push("/dashboard");
          }}
          extraStyle="flex items-center gap-4  text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<HomeIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Blogs"
          onclick={() => {
            setIsOpen(false);
            handleFilter("blog");
          }}
          extraStyle="flex items-center gap-4 text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<DocumentIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Links"
          onclick={() => {
            setIsOpen(false);
            handleFilter("link");
          }}
          extraStyle="flex items-center gap-4 text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<LinkIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Tweets"
          onclick={() => {
            setIsOpen(false);
            handleFilter("tweet");
          }}
          extraStyle="flex items-center gap-4 text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<TwitterIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Youtube"
          onclick={() => {
            setIsOpen(false);
            handleFilter("youtube");
          }}
          extraStyle="flex items-center gap-4  text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<YoutubeIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Questions"
          onclick={() => {
            setIsOpen(false);
            handleFilter("question");
          }}
          extraStyle="flex items-center gap-4  text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<QuestionIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Documents"
          onclick={() => {
            setIsOpen(false);
            handleFilter("document");
          }}
          extraStyle="flex items-center gap-4  text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<DocumentIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Share Brain"
          // size="lg"
          extraStyle="text-persian-blue-800"
          startIcon={<ShareIcon />}
        />
        <Button
          type="button"
          variant="primary"
          onclick={() => {
            setIsOpen(false);
            handleOpenModal();
          }}
          text="Add Brain"
          startIcon={<PlusIcon />}
        />
      </div>
      <div className="mt-1 w-full">
        <div className="flex items-center gap-5"></div>
        <ProfileCard />
      </div>
    </div>
  );
};

export default MobileSidebar;
