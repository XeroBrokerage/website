"use client";

import React, { useRef, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { FiUploadCloud } from "react-icons/fi";

const UploadCommercial = ({ formData, setFormData }) => {
  const textareaRef = useRef(null);

  // Specific amenities for commercial properties
  const amenitiesList = [
    "Lift Facility",
    "Power Backup",
    "24*7 CCTV Surveillance",
    "Fire Safety",
    "Parking Facility",
    "Security",
    "Intercom",
    "Maintenance Staff",
  ];

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.description]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((a) => a !== amenity),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }));
    }
  };

  const formatCurrency = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    e.target.value = value;
  };

  return (
    <form className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Upload Commercial Property</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Commercial Property Title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Address <span className="text-red-500">*</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="810"
              required
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Floors
            </label>
            <input
              type="number"
              name="floors"
              value={formData.floors}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of floors"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parking Available
            </label>
            <select
              name="parking"
              value={formData.parking}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Possession Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="possessionDate"
              value={formData.possessionDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maintenance (₹/sq ft) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="maintenance"
              value={formData.maintenance}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="3.2"
              required
            />
          </div>
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

        {/* Amenities Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">
            Amenities
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Available Amenities
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`amenity-${amenity}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UploadCommercial;
