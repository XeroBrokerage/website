"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import TermsAndConditions from "@/app/terms-and-conditions/page";

const SignupForm = () => {
  const menuRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const router = useRouter();

  const handleTerms = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const otpRes = await axios.post("/api/auth/send-otp", {
        email: formData.email,
      });

      if (otpRes.data.success) {
        toast.success("OTP Sent ✔️", {
          theme: "dark",
          position: "bottom-right",
          autoClose: 3000,
        });

        setStep(2); // Show OTP input UI
      } else {
        throw new Error(otpRes.data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Error occurred",
        {
          theme: "dark",
          position: "bottom-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtpAndSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("OTP is required", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const verifyRes = await axios.post("/api/auth/verify-otp", {
        email: formData.email,
        otp,
      });

      if (!verifyRes.data.success) {
        throw new Error(verifyRes.data.message || "OTP verification failed");
      }

      toast.success("OTP Verified 🎉", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });

      // 2. Register user
      const signupRes = await axios.post("/api/auth/signup", formData, {
        withCredentials: true,
      });

      if (signupRes.data.success) {
        toast.success("Registered Successfully 🙌", {
          theme: "dark",
          position: "bottom-right",
          autoClose: 3000,
        });
        router.push("/Auth/login");
      } else {
        throw new Error(signupRes.data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Error occurred",
        {
          theme: "dark",
          position: "bottom-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div className="inset-0 overflow-hidden ">
          <AnimatePresence>
            {modalOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/20 z-40 backdrop-blur-md"
                />

                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, scale: 0.9, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[90vw] md:w-[70vw] lg:w-[50vw] bg-[#F08080] flex flex-col gap-4 p-4 poppins-semibold z-40 shadow-md backdrop-blur-md rounded-xl"
                >
                  <div className="flex flex-col items-center mb-2 gap-4">
                    <div className="w-full flex justify-end">
                      <button
                        onClick={() => setModalOpen(false)}
                        className="text-white text-4xl poppins-regular"
                        aria-label="Close menu"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="bg-white rounded-2xl">
                      <TermsAndConditions />
                    </div>

                    <button
                      className="px-6 py-4 w-fit rounded-xl bg-green-600 text-white hover:cursor-pointer poppins-bold text-lg m-4"
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          agreeTerms: true,
                        }));
                        setModalOpen(false);
                      }}
                    >
                      ✓ I Agree
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className="inset-0 flex justify-center items-center p-5">
            <form
              onSubmit={handleSendOtp}
              className="w-full max-w-md max-h-fit overflow-y-auto bg-white rounded-xl shadow-lg p-10 flex flex-col gap-5 animate-fade-in hover:shadow-xl transition-shadow"
            >
              <h2 className="text-center text-2xl font-bold text-black">
                Create Account
              </h2>
              <p className="text-center text-black text-sm font-semibold mb-4">
                Join XeroBrokerage today
              </p>

              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Full Name
                </label>
                <div
                  className={`flex items-center rounded-lg h-12 px-3 bg-[#f2f1ef] transition-colors ${
                    errors.name ? "border-red-500" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <input
                    type="text"
                    name="name"
                    className="ml-2 w-full h-full bg-transparent outline-none text-sm text-black"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">Email</label>
                <div
                  className={`flex items-center rounded-lg h-12 px-3 bg-[#f2f1ef] transition-colors ${
                    errors.name ? "border-red-500" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-black"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    className="ml-2 w-full h-full bg-transparent outline-none text-sm text-black"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Password
                </label>
                <div
                  className={`flex items-center rounded-lg h-12 px-3 bg-[#f2f1ef] transition-colors ${
                    errors.name ? "border-red-500" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-black"
                    viewBox="-64 0 512 512"
                    fill="currentColor"
                  >
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="ml-2 w-full h-full bg-transparent outline-none text-sm text-black"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-black hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 6a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5A9.77 9.77 0 013.18 11.5 9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 6a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5A9.77 9.77 0 013.18 11.5 9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Confirm Password
                </label>
                <div
                  className={`flex items-center rounded-lg h-12 px-3 bg-[#f2f1ef] transition-colors ${
                    errors.name ? "border-red-500" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-black"
                    viewBox="-64 0 512 512"
                    fill="currentColor"
                  >
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                  </svg>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="ml-2 w-full h-full bg-transparent outline-none text-sm text-black"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-black hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 6a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5A9.77 9.77 0 013.18 11.5 9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 6a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5A9.77 9.77 0 013.18 11.5 9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex flex-col items-center gap-2 mt-2 text-center">
                {formData.agreeTerms ? (
                  <div className="flex items-center gap-2 text-green-500 cursor-default font-medium">
                    ✓ Agreed to Terms
                  </div>
                ) : (
                  <button
                    onClick={handleTerms}
                    type="button"
                    className="px-4 py-2 bg-red-200 hover:bg-[#F08080] text-black rounded-xl hover:cursor-pointer transition-all duration-200"
                  >
                    ✓ Click to Agree Terms & Conditions
                  </button>
                )}
              </div>
              {errors.agreeTerms && (
                <p className="text-red-500 text-xs -mt-3">
                  {errors.agreeTerms}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-2 w-full h-12 rounded-lg font-medium  text-gray-600 hover:text-black transition-all ${
                  isSubmitting
                    ? "bg-[#FCE277] text-gray-600 cursor-progress"
                    : "bg-[#FCE277] hover:bg-[#FFDF4D] active:translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-black">
                Already have an account?{" "}
                <Link
                  href="../../Auth/login"
                  className="text-blue-900 font-medium hover:underline"
                >
                  Log in
                </Link>
              </p>

              {/* Divider */}
              <div className="flex items-center my-2">
                <div className="flex-1 h-px bg-black"></div>
                <span className="px-3 text-xs text-black uppercase">
                  Or sign up with
                </span>
                <div className="flex-1 h-px bg-black"></div>
              </div>

              {/* Social Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 flex justify-center items-center gap-2 h-12 rounded-lg border-1 cursor-pointer bg-white text-black font-medium "
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <path
                      fill="#FBBB00"
                      d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"
                    />
                    <path
                      fill="#518EF8"
                      d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                    />
                    <path
                      fill="#28B446"
                      d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                    />
                    <path
                      fill="#F14336"
                      d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex-1 flex justify-center items-center gap-2 h-12 rounded-lg border-1 cursor-pointer bg-white text-black font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 22.773 22.773"
                    fill="currentColor"
                  >
                    <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                    <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
                  </svg>
                  Apple
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex justify-center items-center h-fit w-screen p-5 overflow-hidden inset-0">
          <div className="w-full max-w-md max-h-[calc(100vh-40px)] overflow-y-auto">
            <form
              onSubmit={handleVerifyOtpAndSubmit}
              className="flex flex-col gap-5 bg-white p-10 rounded-xl shadow-lg animate-fade-in"
            >
              <h2 className="text-center text-2xl font-bold text-black mb-2">
                Verify OTP...
              </h2>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-black">
                  Enter Your 6 Digit OTP Here
                </label>
                <div className="flex items-center rounded-lg h-12 px-3 bg-[#F2F1EF]">
                  
                  <input
                    type="text"
                    className="ml-2 w-full h-full bg-transparent outline-none text-sm text-black"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-3 w-full h-12 rounded-lg font-bold text-gray-600 hover:text-black transition-all ${
                  isSubmitting
                    ? "bg-[#FCE277] text-gray-600 cursor-progress"
                    : "bg-[#FCE277] hover:bg-[#FFDF4D] active:translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  " Verify OTP..."
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      )
    </div>
  );
};
export default SignupForm;
