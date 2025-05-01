"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("Logged out Successfully", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("error: login first to view your profile", {
        toastId: "auth-error",
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });

      router.push("/Auth/login");
    }
  }, []);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-fit p-16 flex items-center justify-center text-black px-4 flex-col gap-8">
      <div className="bg-black/10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-[80vw] text-lg space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-black poppins-bold">
          {user.name}'s Profile
        </h1>

        <div>
          <strong>Email Address:</strong>{" "}
          <span className="text-blue-900">{user.email}</span>
        </div>
        <div>
          <strong>User ID:</strong>{" "}
          <span className="text-black">{user.id}</span>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className={`w-fit mx-auto mt-6 bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-3xl transition-all duration-300 flex items-center justify-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold  mb-4 text-black poppins-bold">
          Listings by {user.name}
        </h1>
        <div>listings by user {user.id} goes here...</div>
      </div>
    </div>
  );
};

export default Page;
