"use client";

import React, { useRef, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { FiUploadCloud } from "react-icons/fi";

const UploadLand = ({ formData, setFormData }) => {
  const textareaRef = useRef(null);

  // Specific amenities for land properties
  const amenitiesList = [
    "Irrigation Facility",
    "Electricity Connection",
    "Water Supply",
    "Road Access",
    "Fencing",
    "Soil Testing",
    "Drainage System",
  ];

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.description]);

  // Calculate price whenever pricePerAcre or totalAcres changes
  useEffect(() => {
    const pricePerAcreNum = Number(formData.pricePerAcre.replace(/,/g, ""));
    const totalAcresNum = Number(formData.totalAcres);
    if (!isNaN(pricePerAcreNum) && !isNaN(totalAcresNum)) {
      const totalPrice = pricePerAcreNum * totalAcresNum;
      const formattedPrice = totalPrice.toLocaleString("en-IN");
      setFormData((prev) => ({ ...prev, price: formattedPrice }));
    } else {
      setFormData((prev) => ({ ...prev, price: "" }));
    }
  }, [formData.pricePerAcre, formData.totalAcres, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pricePerAcre") {
      const numericVal = value.replace(/,/g, "");
      if (numericVal === "" || /^[0-9\b]+$/.test(numericVal)) {
        let formattedVal = numericVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setFormData((prev) => ({ ...prev, [name]: formattedVal }));
      }
    } else if (name === "totalAcres") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

  return (
    <form className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Upload Land / Plot</h2>

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
            placeholder="Land / Plot Title"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Per Acre (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">₹</span>
              <input
                type="text"
                name="pricePerAcre"
                value={formData.pricePerAcre}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="50,000"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Acres <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="totalAcres"
              value={formData.totalAcres}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Price (₹)
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              readOnly
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
              placeholder="Auto-calculated"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Land Type
          </label>
          <select
            name="landType"
            value={formData.landType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Land Type</option>
            <option value="agricultural">Agricultural</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>
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
          <div className="text-xs text-gray-500 mt-1">
            {formData.description.length}/2000 characters
          </div>
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

export default UploadLand;
