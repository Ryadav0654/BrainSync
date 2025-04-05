"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ProfileCard from "./ProfileCard";
import DocumentIcon from "./icons/DocumentIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import TwitterIcon from "./icons/TwitterIcon";
import QuestionIcon from "./icons/QuestionIcon";
import HomeIcon from "./icons/HomeIcon";
import LinkIcon from "./icons/LinkIcon";
import { useRouter, useSearchParams } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // console.log("contents in sidebar", contents)
  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', type);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className=" px-4 py-8 min-h-screen w-full flex flex-col justify-between bg-slate-900/30 border-r-1 border-white/40">
      <div className="flex flex-col  gap-4 ">
        <h1 className="text-2xl font-extrabold text-white">BrainSync</h1>
        <Button
          type="button"
          variant="secondry"
          text="Home"
          onclick={() => {router.push("/dashboard")}}
          extraStyle="flex items-center gap-3 w-full text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<HomeIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Blogs"
          onclick={() => {handleFilter("blog");}}
          extraStyle="flex items-center gap-3 w-full text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<DocumentIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Links"
          onclick={() => {handleFilter("link");}}
          extraStyle="flex items-center gap-3 w-full text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<LinkIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Tweets"
          onclick={() => {handleFilter("tweet");}}
          extraStyle="flex items-center gap-3 w-full text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<TwitterIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Youtube"
          onclick={() => {handleFilter("youtube");}}
          extraStyle="flex items-center gap-3 w-full  text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<YoutubeIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Questions"
          onclick={() => {handleFilter("question");}}
          extraStyle="flex items-center gap-3 w-full  text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<QuestionIcon />}
        />
        <Button
          type="button"
          variant="secondry"
          text="Documents"
          onclick={() => {handleFilter("document");}}
          extraStyle="flex items-center gap-3 w-full  text-white bg-transparent hover:bg-persian-blue-100/20 font-normal"
          startIcon={<DocumentIcon />}
        />
      </div>
      <div className="w-full">
        <ProfileCard />
      </div>
    </div>
  );
};

export default Sidebar;
