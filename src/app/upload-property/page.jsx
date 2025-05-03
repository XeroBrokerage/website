"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'

import UploadCommercial from "../../components/upload-property/uploadCommercial";
import UploadResidence from "../../components/upload-property/uploadResidence";
import UploadLand from "../../components/upload-property/uploadLand";

const Page = () => {
  const propertyOptions = ["Residential", "Commercial", "Plot/Land"];
  const listingOptions = ["Sell", "Rent"];

  const [propertyType, setPropertyType] = useState("Residential");
  const [listingType, setListingType] = useState("Sell");

  const canRent = propertyType !== "Plot/Land";

  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const router = useRouter();

  // Refs and state for sliding indicator positions
  const propertyRef = useRef(null);
  const listingRef = useRef(null);

  const [propertyIndicatorStyle, setPropertyIndicatorStyle] = useState({});
  const [listingIndicatorStyle, setListingIndicatorStyle] = useState({});

  // Form data state for all property types
  const [residenceData, setResidenceData] = useState({
    title: "",
    address: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    furnishing: "",
    possessionDate: "",
    description: "",
    amenities: [],
    images: "",
  });

  const [commercialData, setCommercialData] = useState({
    title: "",
    address: "",
    price: "",
    area: "",
    floors: "",
    parking: "",
    possessionDate: "",
    maintenance: "",
    description: "",
    amenities: [],
    images: "",
  });

  const [landData, setLandData] = useState({
    title: "",
    address: "",
    price: "",
    pricePerAcre: "",
    totalAcres: "",
    landType: "",
    possessionDate: "",
    description: "",
    amenities: [],
    images: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Update sliding indicator position for property type

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
    if (propertyRef.current) {
      const buttons = propertyRef.current.querySelectorAll("button");
      const index = propertyOptions.indexOf(propertyType);
      if (buttons[index]) {
        const button = buttons[index];
        setPropertyIndicatorStyle({
          width: button.offsetWidth,
          left: button.offsetLeft,
        });
      }
    }
  }, [propertyType]);

  // Update sliding indicator position for listing type
  useEffect(() => {
    if (listingRef.current) {
      const buttons = listingRef.current.querySelectorAll("button");
      const index = listingOptions.indexOf(listingType);
      if (buttons[index]) {
        const button = buttons[index];
        setListingIndicatorStyle({
          width: button.offsetWidth,
          left: button.offsetLeft,
        });
      }
    }
  }, [listingType]);

  // Validation helper function
  const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return false;
      }
    }
    return true;
  };

  // Unified submit handler with flat object payload and validation
  const handleSubmit = async () => {
    setMessage("");

    let payload = {
      propertyType,
      listingType,
      uploadedBy: {
        name: user.name,
        id: user.id,
        email:user.email
      },
      title: "",
      address: "",
      price: "",
      area: "",
      bedrooms: 0,
      bathrooms: 0,
      furnishing: "",
      possessionDate: "",
      description: "",
      amenities: [],
      images: "",
      floors: 0,
      parking: "",
      maintenance: "",
      pricePerAcre: "",
      totalAcres: "",
      landType: "",
    };

    let currentData = null;
    let requiredFields = {};

    if (propertyType === "Residential") {
      currentData = residenceData;
      requiredFields = {
        title: residenceData.title,
        address: residenceData.address,
        price: residenceData.price,
        area: residenceData.area,
        bedrooms: residenceData.bedrooms,
        bathrooms: residenceData.bathrooms,
        furnishing: residenceData.furnishing,
        possessionDate: residenceData.possessionDate,
        description: residenceData.description,
        amenities: residenceData.amenities,
        images: residenceData.images,
      };
      payload = {
        ...payload,
        ...residenceData,
      };
    } else if (propertyType === "Commercial") {
      currentData = commercialData;
      requiredFields = {
        title: commercialData.title,
        address: commercialData.address,
        price: commercialData.price,
        area: commercialData.area,
        floors: commercialData.floors,
        parking: commercialData.parking,
        possessionDate: commercialData.possessionDate,
        maintenance: commercialData.maintenance,
        description: commercialData.description,
        amenities: commercialData.amenities,
        images: commercialData.images,
      };
      payload = {
        ...payload,
        ...commercialData,
      };
    } else if (propertyType === "Plot/Land") {
      currentData = landData;
      requiredFields = {
        title: landData.title,
        address: landData.address,
        price: landData.price,
        pricePerAcre: landData.pricePerAcre,
        totalAcres: landData.totalAcres,
        landType: landData.landType,
        possessionDate: landData.possessionDate,
        description: landData.description,
        amenities: landData.amenities,
        images: landData.images,
      };
      payload = {
        ...payload,
        ...landData,
        area: landData.totalAcres,
      };
    }
    console.log("payload : ", payload.uploadedBy);


    if (!validateFields(requiredFields)) {
      setMessage("❌ Please fill in all required fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      console.log("payload : ", payload.uploadedBy);
      
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // console.log(res);

      if (!res.ok) throw new Error("Failed to upload property.");

      const data = await res.json();
      

      if (data.success) {
        setMessage("✅ Property uploaded successfully!");

        // Call API to update user's posts array
        try {
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
            console.error("Failed to update user posts");
          }
        } catch (err) {
          console.error("Error updating user posts:", err);
        }

        // Reset all form data
        setResidenceData({
          title: "",
          address: "",
          price: "",
          area: "",
          bedrooms: "",
          bathrooms: "",
          furnishing: "",
          possessionDate: "",
          description: "",
          amenities: [],
          images: "",
        });
        setCommercialData({
          title: "",
          address: "",
          price: "",
          area: "",
          floors: "",
          parking: "",
          possessionDate: "",
          maintenance: "",
          description: "",
          amenities: [],
          images: "",
        });
        setLandData({
          title: "",
          address: "",
          price: "",
          pricePerAcre: "",
          totalAcres: "",
          landType: "",
          possessionDate: "",
          description: "",
          amenities: [],
          images: "",
        });
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
    <div className="flex flex-col items-center min-h-fit py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-[98vw] bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-900 mb-3">
          List Your Property
        </h1>
        <p className="text-lg text-gray-700 max-w-md mx-auto">
          Fill in the details to showcase your property
        </p>
      </div>

      {/* Property Type Selector */}
      <span className="block text-lg font-medium text-gray-800 mb-2">
        Property Type
      </span>
      <div
        ref={propertyRef}
        className="relative inline-flex bg-white rounded-md shadow-sm overflow-hidden mb-8"
      >
        <span
          className="absolute top-0 bottom-0 bg-indigo-600 rounded-md transition-all duration-300 ease-in-out"
          style={{
            width: propertyIndicatorStyle.width,
            left: propertyIndicatorStyle.left,
          }}
        />
        {propertyOptions.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              setPropertyType(label);
              if (label === "Plot/Land" && listingType === "Rent") {
                setListingType("Sell");
              }
            }}
            className={`relative z-10 flex items-center justify-center px-5 py-2 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              propertyType === label
                ? "text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            aria-pressed={propertyType === label}
          >
            {label}
          </button>
        ))}
      </div>

      <span className="block text-lg font-medium text-gray-800 mb-2">
        Advertise As
      </span>
      <div
        ref={listingRef}
        className="relative inline-flex bg-white rounded-md shadow-sm overflow-hidden mb-8"
      >
        <span
          className="absolute top-0 bottom-0 bg-indigo-600 rounded-md transition-all duration-300 ease-in-out"
          style={{
            width: listingIndicatorStyle.width,
            left: listingIndicatorStyle.left,
          }}
        />
        {listingOptions.map((type) => {
          const isDisabled = type === "Rent" && !canRent;

          return (
            <button
              key={type}
              type="button"
              onClick={() => !isDisabled && setListingType(type)}
              className={`relative z-10 px-8 py-2 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                listingType === type && !isDisabled
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isDisabled}
              title={isDisabled ? "Rent not available for Plot/Land" : ""}
              aria-pressed={listingType === type}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Conditionally render the upload components based on propertyType */}
      <div className="w-full max-w-4xl">
        {propertyType === "Residential" && (
          <UploadResidence
            formData={residenceData}
            setFormData={setResidenceData}
          />
        )}
        {propertyType === "Commercial" && (
          <UploadCommercial
            formData={commercialData}
            setFormData={setCommercialData}
          />
        )}
        {propertyType === "Plot/Land" && (
          <UploadLand formData={landData} setFormData={setLandData} />
        )}
      </div>

      {/* Submit Button */}
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

export default Page;
