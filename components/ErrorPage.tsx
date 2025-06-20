import React from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = ({ code = 500, message = "Something went wrong." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md text-center text-dark-100">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-2">Error {code}</h1>
        <p className="text-lg mb-6">{message}</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
