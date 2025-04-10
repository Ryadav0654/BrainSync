"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";

const Signup = () => {
  const router = useRouter();
  const session = useSession();
  const [show, setShow] = useState(false);
  const [type, setType] = useState("password");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const { name, email, password, rePassword } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registerUser = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!name || !email || !password) {
        return toast.error("Something went wrong!");
      }

      if (password !== rePassword) {
        return toast.error("Passwords do not match!");
      }

      const data = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log("data -> ", data);
      if (data.status !== 200) {
        console.log("data -> ", data);
        return toast.error("Something went wrong!");
      }

      toast.success("User has been registered.");
      router.push("/signin");
      setData({
        name: "",
        email: "",
        password: "",
        rePassword: "",
      });
    } catch (error) {
      console.log("error: ", error);
      return toast.error("Something went wrong!");
    }
  };

  const handleToggle = () => {
    setShow(!show);
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  useEffect(() => {
      if (session.status === "authenticated") {
        router.push("/");
      }
    }, [session.status, router]);

  return (
    <div className="w-[300px] mx-auto flex flex-col justify-center h-screen">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-5">Sign Up with <span className="text-blue-500">BrainSync</span></h1>
      <form onSubmit={registerUser}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="jhon doe"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@gmail.com"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>

          <div className="relative">
            <input
              type={type}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />

            {/* Eye Icon */}
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={handleToggle}
            >
              {show ? (
                <IoEyeOutline size={20} />
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            name="rePassword"
            value={data.rePassword}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        <div className="mt-5">
          <p>
            Already have an account?{" "}
            <Link
              className="text-blue-700 underline font-bold text-lg"
              href="/signin"
            >
              Signin
            </Link>{" "}
          </p>
        </div>
      </form>
      <div className="mt-10 mb-4 w-full h-[1px] bg-gray-400 relative top-0 left-0">
        <span className="text-gray-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#202135] px-1 font-semibold">
          OR
        </span>
      </div>
      <div className="flex items-center justify-center py-2 gap-x-5">
        <button
          className="bg-white hover:bg-white/80 flex items-center p-1.5 rounded-full"
          onClick={() => signIn("google")}
        >
          <picture>
          <img src="./google.svg" alt="" className="w-8 h-8" />
          </picture>
        </button>
        <button
          className="bg-white hover:bg-white/80 flex items-center p-1.5 rounded-full"
          onClick={() => signIn("github")}
        >
          <picture>
          <img src="./github-mark.svg" alt="github" className="w-8 h-8" />
          </picture>
        </button>
      </div>
    </div>
  );
};

export default Signup;
