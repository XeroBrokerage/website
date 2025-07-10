"use client";

import PropertyCard from "@/components/property/CommercialPropertyCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FeaturedListings({ advertiseAs }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/api/properties/commercial")
      .then((res) => setProperties(res.data.listings))
      .catch((err) => console.error("Failed to fetch properties:", err));
  }, []);

  // 🔍 Filter by advertiseAs if it's passed
  const filteredProperties = advertiseAs
    ? properties.filter((property) => property.advertiseAs === advertiseAs)
    : properties;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
      <h2 className="text-2xl sm:text-4xl poppins-bold mb-6">
        Featured Commercial Properties
      </h2>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-12">
          No {advertiseAs ? `"${advertiseAs}"` : ""} properties found. Try again later!
        </div>
      )}
    </section>
  );
}
