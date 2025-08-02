"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function PropertyUploadPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login first to upload Property", {
        toastId: "auth-error",
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });
      router.push("/Auth/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col items-center min-h-fit py-12 px-4 sm:px-6 lg:px-8 mx-auto ">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          List Your Property
        </h1>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">Select Property Type</h1>

      <div className="grid grid-cols-2 gap-4 rounded-md shadow-sm overflow-hidden mb-8 max-w-screen-sm mx-auto p-4 sm:p-6 text-xl poppins-semibold">
        <Link href="/property-upload/residential">
          <button
            type="button"
            className="flex flex-col items-center bg-black/10 border rounded-xl justify-between px-4 py-6 sm:py-8 md:py-10 w-full md:w-[10vw] h-full"
          >
            <img
              src="/house.svg"
              className="w-12 h-12 sm:w-16 sm:h-16 mb-2"
              alt="Residential"
            />
            <span>Residential</span>
          </button>
        </Link>

        <Link href="/property-upload/commercial">
          <button
            type="button"
            className="flex flex-col items-center bg-black/10 border rounded-xl justify-center px-4 py-6 sm:py-8 md:py-10 w-full md:w-[10vw] h-full"
          >
            <img
              src="/shop.svg"
              className="w-12 h-12 sm:w-16 sm:h-16 mb-2"
              alt="Commercial"
            />
            <span>Commercial</span>
          </button>
        </Link>

        <Link href="/property-upload/land-plot">
          <button
            type="button"
            className="flex flex-col items-center bg-black/10 border rounded-xl justify-center px-4 py-6 sm:py-8 md:py-10 w-full md:w-[10vw] h-full"
          >
            <img
              src="/land.svg"
              className="w-12 h-12 sm:w-16 sm:h-16 mb-2"
              alt="Plot/Land"
            />
            <span>Plot/Land</span>
          </button>
        </Link>

        <Link href="/property-upload/hostel-pg">
          <button
            type="button"
            className="flex flex-col items-center bg-black/10 border rounded-xl justify-center px-4 py-6 sm:py-8 md:py-10 w-full md:w-[10vw] h-full"
          >
            <img
              src="/hostel.svg"
              className="w-12 h-12 sm:w-16 sm:h-16 mb-2"
              alt="PG/Hostel"
            />
            <span>PG/Hostel</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
