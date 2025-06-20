"use client";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import PlusIcon from "./icons/PlusIcon";
import CrossIcon from "./icons/CrossIcon";
import apiClient from "@/libs/apiClient";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import ErrorPage from "./ErrorPage";

type Inputs = {
  title: string;
  type: string;
  link: string;
  tags: string;
};
const AddBrainModal = ({
  handleOpenModal,
}: {
  handleOpenModal: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleAddBrain: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const { title, type, link, tags } = data;
      const res = await apiClient.post("/api/content", {
        title,
        type,
        link,
        tags: tags.split(",").map((t) => t.trim()),
      });

      console.log("res in add brain", res);
      if (res.status !== 200) {
        toast.error("Failed to add brain");
        setLoading(false);
        console.error("error occured while adding brain: ", res);
      }
      toast.success("Brain added successfully");
      reset();
      handleOpenModal();
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        setError("Rate limit exceeded. Try again shortly.");
      } else {
        setError("Failed to add brain.");
      }
    }
  };

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="fixed flex z-10 justify-center items-center top-0 left-0 right-0 h-screen w-full bg-[#212035]/80 p-6">
      <div className="bg-gray-900/60 rounded-3xl p-6 xl:p-8 md:max-w-[45vw] lg:max-w-[35vw] w-full shadow-xl shadow-persian-blue-500/20">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">Add your brain</h1>
          <span className="cursor-pointer" onClick={handleOpenModal}>
            <CrossIcon />
          </span>
        </div>

        <form
          onSubmit={handleSubmit(handleAddBrain)}
          className="flex flex-col justify-center gap-5 mt-6"
        >
          <Input
            type="text"
            placeholder="Enter title"
            {...register("title", { required: true })}
            extraStyle="rounded-xl bg-gray-600/50  focus:outline-blue-500 font-normal"
          />
          {errors.title && (
            <span className="text-red-500">Title is required!</span>
          )}

          <Input
            type="text"
            placeholder="Enter link"
            {...register("link", { required: true })}
            extraStyle="rounded-xl bg-gray-600/50  focus:outline-blue-500 font-normal"
          />
          {errors.link && (
            <span className="text-red-500">Link is required!</span>
          )}

          <select
            {...register("type", { required: true })}
            className="py-3 px-4 rounded-xl bg-gray-600/50 outline-none focus:outline-blue-500 font-normal"
          >
            <optgroup className="font-semibold bg-[#212035]/95 text-white">
              <option disabled>Select Type</option>
              <option defaultChecked>Link</option>
              <option>Tweet</option>
              <option>Youtube</option>
              <option>Blog</option>
              <option>Document</option>
              <option>Question</option>
            </optgroup>
          </select>
          {errors.type && (
            <span className="text-red-500">Type is required</span>
          )}
          <Input
            type="text"
            placeholder="Enter tags (use comma)"
            {...register("tags", { required: true })}
            extraStyle="rounded-xl bg-gray-600/50  focus:outline-blue-500 font-normal"
          />
          {errors.tags && (
            <span className="text-red-500">Tags are required!</span>
          )}
          {/* <select
            disabled
            className="py-3 px-4 rounded-xl bg-gray-600/50 outline-none focus:outline-blue-500 font-normal"
          >
            <optgroup className="font-semibold bg-[#212035]/95 text-white">
              <option disabled>Select Type</option>
              <option defaultChecked>Productivity</option>
              <option>Latest News</option>
              <option>Health</option>
              <option>Motivation</option>
            </optgroup>
          </select> */}

          <Button
            type="submit"
            disabled={
              loading || !!errors.title || !!errors.link || !!errors.type
            }
            variant="primary"
            text="Add New Brain"
            extraStyle="flex items-center gap-3 w-full text-white justify-center hover:bg-persian-blue-100/20 font-semibold cursor-pointer disabled:bg-persian-blue-500/20 disabled:text-gray-400 disabled:cursor-not-allowed"
            startIcon={<PlusIcon />}
          />
        </form>
      </div>
    </div>
  );
};

export default AddBrainModal;
