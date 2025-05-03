"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const DEFAULT_PROFILE_IMAGE = "/def_profile.png";
import { Loader2, Edit, Camera, Lock, Mail, User } from "lucide-react";

const UserProfile = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validatePasswordChange = () => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Validate current password (mock validation - replace with actual API call)
    if (!passwordForm.currentPassword) {
      errors.currentPassword = "Current password is required";
      isValid = false;
    } else if (passwordForm.currentPassword.length === 0) {
      errors.currentPassword = "Password Invalid";
      isValid = false;
    }

    // Validate new password
    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    // Validate confirm password
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    profilePic: "/def_profile.jpg",
  });

  const fileInputRef = useRef(null);
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch("/api/users/get-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        if (data.success && data.user) {
          setProfileData({
            name: data.user.name || "",
            phone: data.user.phone || "",
            profilePic: data.user.profilePic || "/def_profile.png",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("Logged out Successfully", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login first to view your profile", {
        toastId: "auth-error",
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });
      router.push("/Auth/login");
    }
  }, [isAuthenticated, router]);

  const handleProfilePicChange = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return; // Exit if no file selected

      // Validate file type
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (e.g., 2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({ ...profileData, profilePic: event.target.result });
      };
      reader.onerror = () => {
        toast.error("Error reading file");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Error uploading image");
      console.error("File upload error:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePasswordChange()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Password changed successfully!", {
          theme: "dark",
          position: "bottom-right",
          autoClose: 3000,
        });
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordForm(false);
        setPasswordErrors({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        if (data.error === "Invalid current password") {
          setPasswordErrors((prev) => ({
            ...prev,
            currentPassword: "Current password is incorrect",
          }));
        } else {
          toast.error(data.error || "Password change failed. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Password change failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update profile through auth context
      await updateProfile({
        name: profileData.name,
        phone: profileData.phone,
        profilePic: profileData.profilePic,
      });
      toast.success("Profile updated successfully!", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 3000,
      });
      setEditMode(false);
    } catch (error) {
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          {/* Profile Header */}
          <div className="bg-blue-400 px-6 py-8 text-center rounded-t-lg flex flex-col items-center">
            <div className="w-fit mb-4 relative">
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={profileData.profilePic || DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_PROFILE_IMAGE;
                  }}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  accept="image/*"
                  className="hidden"
                />
                
              </div>
              <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition transform hover:scale-110"
                  disabled={loading}
                  type="button" // Important to prevent form submission
                >
                  <Camera size={18} />
                </button>
            </div>

            <h1 className="text-2xl font-bold text-white mb-1">
              {profileData.name || user.name}
            </h1>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Profile Information
              </h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  disabled={loading}
                >
                  <Edit className="mr-1" /> Edit Profile
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center p-2 bg-gray-100 rounded-md">
                      <Mail className="text-gray-500 mr-2" />
                      <span>{user.email}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Contact support to change email
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : null}
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <User className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-medium">{user.id}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <Mail className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                {profileData.phone && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <svg
                      className="text-gray-500 mr-3 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{profileData.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Password Change Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Security
                </h2>
                {!showPasswordForm && (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    disabled={loading}
                  >
                    <Lock className="mr-1" /> Change Password
                  </button>
                )}
              </div>

              {showPasswordForm && (
                <form onSubmit={submitPasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        passwordErrors.currentPassword ? "border-red-500" : ""
                      }`}
                      required
                      disabled={loading}
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {passwordErrors.currentPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        passwordErrors.newPassword ? "border-red-500" : ""
                      }`}
                      required
                      disabled={loading}
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {passwordErrors.newPassword}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        passwordErrors.confirmPassword ? "border-red-500" : ""
                      }`}
                      required
                      disabled={loading}
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {passwordErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : null}
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordErrors({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* User Listings Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Listings by {profileData.name || user.name}
          </h2>
          <div className="text-center py-8 text-gray-500">
            Your property listings will appear here
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`w-fit mx-auto bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
