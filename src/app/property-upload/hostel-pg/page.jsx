"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FiUploadCloud } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";

const pgHostel = () => {
  const textareaRef = useRef(null);
  const [formData, setFormData] = useState({
    rentPerMonth: "",
    sharingType: "",
    foodIncluded: "",
    furnishing: "",
    attachedBathroom: "",
    acAvailable: "",
    wifi: "",
    address: "",
    images: "",
    description: "",
  });

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.description]);

  const formatCurrency = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    e.target.value = value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form className="max-w-4xl mx-auto bg-white p-8 shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">PG / Hostel Listing</h2>
        <div className="space-y-6">

          {/* Rent and Sharing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent per Month (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="text"
                  name="rentPerMonth"
                  value={formData.rentPerMonth}
                  onChange={(e) => {
                    formatCurrency(e);
                    handleChange(e);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5,000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sharing Type
              </label>
              <select
                name="sharingType"
                value={formData.sharingType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="Dormitory">Dormitory</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Included?
              </label>
              <select
                name="foodIncluded"
                value={formData.foodIncluded}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="No">No</option>
                <option value="Breakfast Only">Breakfast Only</option>
                <option value="Lunch & Dinner">Lunch & Dinner</option>
                <option value="All Meals">All Meals</option>
              </select>
            </div>
          </div>

          {/* Room Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <option value="">Select</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attached Bathroom?
              </label>
              <select
                name="attachedBathroom"
                value={formData.attachedBathroom}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AC Available?
              </label>
              <select
                name="acAvailable"
                value={formData.acAvailable}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Both Available">Both Available</option>
              </select>
            </div>
          </div>

          {/* Connectivity & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wi-Fi Available?
              </label>
              <select
                name="wifi"
                value={formData.wifi}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="PG / Hostel Address"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">Upload Photos</h2>

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
                  Upload Image
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

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">Description</h2>

            <textarea
              ref={textareaRef}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
              placeholder="Mention nearby colleges, features, vibe, curfew, rules, roommate type etc."
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default pgHostel;
