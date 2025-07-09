'use client'

import PropertyCard from "@/components/property/ResidentialPropertyCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FeaturedListings() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/api/properties/residential")
      .then(res => setProperties(res.data.listings))
      .catch(err => console.error("Failed to fetch properties:", err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
      <h2 className="text-2xl sm:text-4xl poppins-bold mb-6">Featured Residential Properties </h2>
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-12">
          No property found. Try again later!
        </div>
      )}
    </section>
  );
}
