import PropertyCard from "@/components/property/ResidentialPropertyCard";
import axios from "axios";
import { useEffect, useState } from "react";

const HotProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/api/properties/residential")
      .then((res) => setProperties(res.data.listings))
      .catch((err) => console.error("Failed to fetch properties:", err));
  }, []);

  return (
    <>
      <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-12">
        Featured Properties...
      </h2>
      <div className=" overflow-x-auto pb-4">
        <div className="flex space-x-4 w-max px-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property._id} className="min-w-[280px] max-w-[300px]">
                <PropertyCard property={property} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg py-12">
              No Properties Yet.. Explore All Properties
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HotProperties;
