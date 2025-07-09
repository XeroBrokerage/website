'use client'

import PropertyCard from "@/components/property/LandPlotCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FeaturedListings() {

  const [properties , setProperties] = useState([])
  
  useEffect(() => {
    axios.get("/api/properties/plot").then(res => setProperties(res.data.listings) )
    
  }, [])

  return (
    <div className="flex flex-row flex-wrap justify-center gap-8">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
}

