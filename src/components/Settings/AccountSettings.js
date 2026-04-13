
"use client";
import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";

const AccountSettings = () => {
  const { user, logIn } = useAuth();

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);


      const res = await apiClient.post("/user/update-user-profile", {
        id: user.id,
        password: form.password,
      });


      if (res.data.token) {
        logIn(res.data.token);
      }

      toast.success("Password updated successfully");

      setForm({
        password: "",
        confirmPassword: "",
      });

      setErrors({});
      setShowPasswordForm(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF6ED]">
      <div className="max-w-[900px]">

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#2c2c2c]">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your account settings
          </p>
        </div>

        <div className="bg-[#FAF6ED] border border-[#1B3A5C0F] rounded-2xl overflow-hidden">

          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6dfd5]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#f3efe6] flex items-center justify-center">
                <FiLock className="text-[#1f3b57]" size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#2c2c2c]">
                  Change password
                </p>
                <p className="text-xs text-gray-500">
                  Update your account password
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="text-sm px-4 py-2 rounded-lg border border-[#e6dfd5] bg-[#f8f3eb] hover:bg-[#eee7dd] transition"
            >
              {showPasswordForm ? "Cancel" : "Update"}
            </button>
          </div>

          {showPasswordForm && (
            <div className="px-5 py-5 bg-[#f8f3eb]">

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="New password"
                      value={form.password}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 text-sm bg-white outline-none pr-10 ${
                        errors.password
                          ? "border-red-500"
                          : "border-[#e6dfd5] focus:border-[#1f3b57]"
                      }`}
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 text-sm bg-white outline-none pr-10 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-[#e6dfd5] focus:border-[#1f3b57]"
                      }`}
                    />

                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-[#1f3b57] text-white px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Password"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;