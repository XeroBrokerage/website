"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FiUploadCloud } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const residential = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const textareaRef = useRef(null);
  const [formData, setFormData] = useState({
    uploadedBy: {
      name: user.name,
      id: user.id,
      email: user.email,
    },
    area: "",
    price: "",
    advertiseAs: "",
    residentialType: "",
    bhkConfig: "",
    parking: "",
    furnishing: "",
    address: "",
    images: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.description]);

const formatCurrency = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  value = value.replace(/^0+/, '');
  if (value === '') value = '0';

  let lastThree = value.substring(value.length - 3);
  let otherNumbers = value.substring(0, value.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  e.target.value = result;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setMessage("");

    setLoading(true);

    try {
      const res = await fetch("/api/properties/residential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to upload property.");
      const data = await res.json();

      if (data.success) {
        setMessage("✅ Property uploaded successfully!");

        const updateRes = await fetch("/api/users/update-posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            propertyId: data.property._id,
          }),
        });

        if (!updateRes.ok) {
          console.error("❌ Failed to update user posts");
        }
      } else {
        setMessage(`❌ ${data.error || "Upload failed. Please try again."}`);
      }
    } catch (err) {
      setMessage("❌ Upload failed. Please try again.");
      console.error("UPLOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-fit py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-[98vw] ">
      <form className="max-w-4xl mx-auto bg-white p-8  shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">
          Upload Residential Property
        </h2>
        <div className="space-y-6">
          {/* Selling / Renting  */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Do you want to Sell or Rent?
            </label>
            <select
              name="advertiseAs"
              value={formData.advertiseAs}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option value="Sell">Sell</option>
              <option value="Rent">Rent</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Place Type Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select the type of Residential Place.
              </label>
              <select
                name="residentialType"
                value={formData.residentialType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Apartment / Flat">Apartment / Flat</option>
                <option value="Independent House / Villa">
                  Independent House / Villa
                </option>
              </select>
            </div>
            {/* Place Type Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select the BHK configuration
              </label>
              <select
                name="bhkConfig"
                value={formData.bhkConfig}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="1RK">1RK</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="4BHK">4BHK</option>
                <option value="5BHK">5BHK</option>
                <option value="5BHK+">5BHK+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Parking Available?
              </label>
              <select
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Furnishing
              </label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Price (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={(e) => {
                    formatCurrency(e);
                    handleChange(e);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1,00,00,000"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area (sq ft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1200"
                required
                min="0"
              />
            </div>
          </div>

          {/* Address Section */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Full Address of Residential Place
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Property Address"
              required
            />
          </div>

          {/* Image Upload Section */}

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">
              Property Images
            </h2>

            <CldUploadWidget
              uploadPreset="unsigned-upload"
              onSuccessAction={(result) => {
                const url = result?.info?.secure_url;
                if (url) {
                  setFormData((prev) => ({ ...prev, images: url }));
                }
              }}
            >
              {({ open }) => (
                <button
                  className="w-full p-8 bg-blue-100 poppins-bold rounded-xl border border-blue-800"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  <FiUploadCloud className="inline-block mr-2" />
                  Upload an Image
                </button>
              )}
            </CldUploadWidget>

            {formData.images && (
              <div className="mt-4">
                <img
                  src={formData.images}
                  alt="Preview"
                  className="rounded-lg border border-gray-200 h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* Description Section */}

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">
              Description
            </h2>

            <textarea
              ref={textareaRef}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
              placeholder="Describe your property in detail... (location advantages, special features, nearby amenities)"
              required
            />
          </div>
        </div>
      </form>
      
      <div className="w-full max-w-4xl mt-8">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Property"}
        </button>
        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default residential;
