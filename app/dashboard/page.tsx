"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import React from "react";
import getContent from "@/libs/actions/getContent";
import AddBrainModal from "@/components/AddBrainModal";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import DeleteConfirmation from "@/components/DeletePopup";
import { set } from "react-hook-form";

interface Content {
  id: string;
  title: string;
  type: string;
  user: {
    name: string;
  };
  createdAt: Date;
  link: string;
  tags: string[];
}



 const Dashboard =  () => {
  const session = useSession();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const [allContent, setAllContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);

  const search = searchParams.get("search")?.toLowerCase() || "";

  // Fetch once on page load
  useEffect(() => {
    setLoading(true);
    const fetchContent = async () => {
      const data = await getContent();
      const promise = new Promise((resolve) => setTimeout(resolve, 2000));
      await promise;
      setLoading(false);
      setAllContent(data);
    };
    fetchContent();
  }, []);


  //Filter whenever search param or content changes
  useEffect(() => {
    if (!allContent.length) return;

    const filtered = search
      ? allContent.filter((item) => item.type.toLowerCase().includes(search))
      : allContent;

    setFilteredContent(filtered);
  }, [search, allContent]);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      window.location.href = "/signin";
    }
  }, [session.status]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  if(loading){
    return <LoadingSkeleton />
  }

  return (
    <>
      {openModal && <AddBrainModal handleOpenModal={handleOpenModal} />}
      <div className="grid grid-cols-6 fixed top-0 max-h-screen w-full">
        <div className="hidden lg:block lg:col-span-1 bg-transparent">
          <Sidebar />
        </div>
        <div className="col-span-6 lg:col-span-5 px-6 py-2">
          <DashboardHeader handleOpenModal={handleOpenModal} />
          <div className="flex justify-start  flex-wrap gap-8 pb-36 pt-6 max-h-screen md:px-6 md:pt-6 md:pb-24  overflow-y-scroll scrollbar-none">
            {filteredContent.length === 0 && (
              <h1 className="text-3xl font-bold text-center">
                No contents found. Please add one.
              </h1>
            )}
            {filteredContent.map((content) => (
              <Card
                key={content.id}
                id={content.id}
                title={content.title}
                type={content.type}
                username={content?.user?.name}
                link={content?.link}
                createdAt={content.createdAt}
                tags={content?.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
