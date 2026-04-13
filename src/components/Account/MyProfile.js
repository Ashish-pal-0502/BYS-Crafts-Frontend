

"use client";
import useAuth from "@/auth/useAuth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiClient from "@/api/client";


const MyProfile = () => {
const { user, logIn } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresse, setAddresse] = useState([]);
  console.log("user", user)

  // console.log(addresse)


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        dob: user?.dob || "",
      });
    }
  }, [user, isEditing]);

   const getUserDetails = async () => {
    try {
      if (!user?.id) return;

      const res = await apiClient.get("/user/get-profile", {
        id: user.id ,
      });

      console.log("res of ...", res)

      setAddresse(res?.data);
    } catch (error) {
      console.log("error", error);
    } 
  };

  useEffect(() => {
    if (user) {
      getUserDetails();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleUpdate = async () => {
  setLoading(true);

  console.log("pay", {
      id: user._id || user.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber, 
      dob: formData.dob,
    } )

    console.log("called")
  try {
    const res = await apiClient.post("/user/update-user-profile", {
      id: user.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber, 
      dob: formData.dob,
    });

    console.log("after")

    console.log("res", res)

    if (res.data.token) {
      logIn(res.data.token); // update user in context
    }

    toast.success("Profile updated successfully");
    setIsEditing(false);
  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Failed to update profile"
    );
  }finally{
    setLoading(false);
  }
};

  return (
    <div className="bg-[#f5f1e9] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#2c2c2c]">
              Personal information
            </h1>
            <p className="text-sm text-gray-500">
              Your account details
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-[#1B3A5C] text-[#1B3A5C] rounded-md text-sm hover:bg-[#eef2f6] transition"
            >
              Edit profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#1f3b57] text-white rounded-md text-sm hover:opacity-90 transition"
            >
             {loading ? "Updating..." : "Update profile"}
            </button>
          )}
        </div>

        <div className="bg-[#f8f5ee] border border-[#e2ddd5] rounded-xl p-6">

          <div className="grid md:grid-cols-2 gap-y-6 gap-x-10">

            <div>
              <p className="text-xs text-gray-500 mb-1">Full name</p>

              {!isEditing ? (
                <p className="text-sm font-medium">
                  {user?.name || "Not set"}
                </p>
              ) : (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-[#e2ddd5] rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-[#1f3b57]"
                />
              )}
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Email</p>

              {!isEditing ? (
                <p className="text-sm font-medium">
                  {user?.email || "Not set"}
                </p>
              ) : (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-[#e2ddd5] rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-[#1f3b57]"
                />
              )}
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Phone</p>

              {!isEditing ? (
                <p className="text-sm font-medium">
                  +91 {user?.phone || "Not set"}
                </p>
              ) : (
                <input
                  type="text"
                  name="phoneNumber"
               value={formData?.phoneNumber || ""} 
                  onChange={handleChange}
                  className="w-full border border-[#e2ddd5] rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-[#1f3b57]"
                />
              )}
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Date of birth</p>

              {!isEditing ? (
                <p className="text-sm font-medium">
                  {user?.dob || "Not set"}
                </p>
              ) : (
                <input
                  type="date"
                  name="dob"
                value={formData?.dob || ""}
                  onChange={handleChange}
                  className="w-full border border-[#e2ddd5] rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-[#1f3b57]"
                />
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;