"use client";

import Hero from "@/components/ui/Hero";
import PropertySearch from "@/components/search/PropertySearch";
import Services from "@/components/ui/Services";
import Testimonials from "@/components/ui/Testimonial";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto min-w-full px-4 bg-gradient-to-b from-[#ffdf4d] to-[#faf7e7] h-fit mb-16">
        <PropertySearch />
      </div>
      <div className="container mx-auto px-4">
        <Services />
      </div>
      <div className="container mx-auto px-4">
        <Testimonials />
      </div>
      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </>
  );
}
