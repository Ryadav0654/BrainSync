"use client";
import React, { useState } from "react";
import Button from "./Button";
import ShareIcon from "./icons/ShareIcon";
import MenuIcon from "./icons/MenuIcon";
import MobileSidebar from "./MobileSidebar";
import PlusIcon from "./icons/PlusIcon";
const DashboardHeader = ({
  handleOpenModal,
}: {
  handleOpenModal: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between py-3  md:px-4 md:py-4">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
      </div>
      <div className="md:hidden block">
        <span onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon />
        </span>
        <div className="absolute top-0 w-full left-0">
          {isOpen && (
            <MobileSidebar
              handleOpenModal={handleOpenModal}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </div>
      <div className="items-center gap-5 hidden md:flex">
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
          onclick={handleOpenModal}
          text="Add Brain"
          startIcon={<PlusIcon />}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
