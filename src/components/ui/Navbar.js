"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest("svg")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="header fixed min-w-screen min-h-20 lg:min-h-20 bg-[#ffdf4d] flex justify-between items-center lg:px-6 px-4 z-50">
      <Link href="/" className="playfair-display text-3xl">
        <div className="flex items-center justify-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="50px"
              fill="#000000"
            >
              <path d="M370-440h60v-120h100v120h60v-185l-110-73-110 73v185Zm110 281q133-121 196.5-219.5T740-552q0-118-75.5-193T480-820q-109 0-184.5 75T220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
            </svg>
          </span>
          <div className="flex flex-col ">
            <span className="text-3xl poppins-bold tracking-widest -mb-2">
              xero
            </span>
            <span className="text-lg poppins-regular tracking-widest">
              BROKERAGE
            </span>
          </div>
        </div>
      </Link>

      <div
        className="lg:hidden md:hidden flex cursor-pointer"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#000000"
        >
          <path d="M99-205v-92h763v92H99Zm0-229v-91h763v91H99Zm0-229v-92h763v92H99Z" />
        </svg>
      </div>

      <div className="lg:flex md:flex hidden items-center lg:gap-4 md:gap-2 poppins-semibold">
        <NavLinks />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/10 lg:hidden z-40 backdrop-blur-md"
            />

            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-[72px] left-1/2 transform -translate-x-1/2 w-[92vw] max-w-md bg-black/70 text-white flex flex-col gap-4 p-4 poppins-semibold lg:hidden z-50 shadow-md backdrop-blur-md rounded-xl"
            >
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-4xl poppins-regular"
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              <NavLinks onClick={() => setMenuOpen(false)} isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLinks({  onClick, isMobile = false  }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <Link
        href="/contact-us"
        onClick={onClick}
        className="flex items-center gap-2 p-2 poppins-bold text-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill= {isMobile? "#ffffff": "#000000"}
        >
          <path d="M490.67-472.67v-334q0-14.16 9.58-23.75Q509.83-840 524-840h282.67q14.16 0 23.75 9.58 9.58 9.59 9.58 23.75V-612q0 14.17-9.58 23.75-9.59 9.58-23.75 9.58H600l-109.33 106Zm66.66-172.66h216v-128h-216v128Zm0 0v-128 128ZM796-120q-119 0-240-55.5T333-333Q231-435 175.5-556T120-796q0-18.86 12.57-31.43T164-840h147.33q14 0 24.34 9.83Q346-820.33 349.33-806l26.62 130.43q2.05 14.9-.62 26.24-2.66 11.33-10.82 19.48L265.67-530q24 41.67 52.5 78.5T381-381.33q35 35.66 73.67 65.5Q493.33-286 536-262.67l94.67-96.66q9.66-10.34 23.26-14.5 13.61-4.17 26.74-2.17L806-349.33q14.67 4 24.33 15.53Q840-322.27 840-308v144q0 18.86-12.57 31.43T796-120ZM233-592l76-76.67-21-104.66H187q3 41.66 13.67 86Q211.33-643 233-592Zm365.33 361.33q40.34 18.34 85.84 29.67 45.5 11.33 89.16 13.67V-288l-100-20.33-75 77.66ZM233-592Zm365.33 361.33Z" />
        </svg>
        Contact Us
      </Link>
      {isAuthenticated ? (
        <Link
          href="/profile"
          onClick={onClick}
          className="flex items-center gap-2 p-2 bg-black/70 text-white poppins-bold rounded-xl text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#ffffff"
          >
            <path d="M237-285q54-38 115.5-56.5T480-360q66 0 127.5 18.5T723-285q35-41 52-91t17-104q0-129.67-91.23-220.84-91.23-91.16-221-91.16Q350-792 259-700.84 168-609.67 168-480q0 54 17 104t52 91Zm243-123q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42Zm.28 312Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q52 0 100-16.5t90-48.5q-43-27-91-41t-99-14q-51 0-99.5 13.5T290-233q42 32 90 48.5T480-168Zm0-312q30 0 51-21t21-51q0-30-21-51t-51-21q-30 0-51 21t-21 51q0 30 21 51t51 21Zm0-72Zm0 319Z" />
          </svg>
          {user.name}
        </Link>
      ) : (
        <Link
          href="/Auth/login"
          onClick={onClick}
          className="flex items-center gap-2 p-2 bg-black/70 text-white poppins-bold rounded-xl text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#ffffff"
          >
            <path d="M480-144v-72h264v-528H480v-72h264q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H480Zm-72-168-51-51 81-81H144v-72h294l-81-81 51-51 168 168-168 168Z" />
          </svg>
          Login
        </Link>
      )}
    </>
  );
}
