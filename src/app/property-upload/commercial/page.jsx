"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FiUploadCloud } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";

const commercialProperty = () => {
  const textareaRef = useRef(null);
  const [formData, setFormData] = useState({
    propertyType: "",
    pricePerSqFt: "",
    area: "",
    roadConnectivity: "",
    address: "",
    images: "",
    description: "",
    lift: "",
    security: "",
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
      <form className="max-w-4xl mx-auto bg-white p-8  shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">
          Upload your Commercial Property
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Commercial Type
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Office Space">Office Space</option>
              <option value="Retail Shop">Retail Shop</option>
              <option value="Showroom">Showroom</option>
              <option value="Commercial Building">Commercial Building</option>
              <option value="Co-working Space">Co-working Space</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Commercial Land">Commercial Land</option>
              <option value="Industrial Shed">Industrial Shed</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Price per sq ft (₹){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="text"
                  name="pricePerSqFt"
                  value={formData.pricePerSqFt}
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
                placeholder="2500"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Road Connectivity
              </label>
              <select
                name="roadConnectivity"
                value={formData.roadConnectivity}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Parking available
              </label>
              <select
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lift Facility
              </label>
              <select
                name="lift"
                value={formData.lift}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Security / CCTV
              </label>
              <select
                name="security"
                value={formData.security}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Full Address of the Property
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Complete address with building name if any"
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
              placeholder="Describe the property, building features, nearby business hubs, parking, etc."
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default commercialProperty;
