"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./InputField";
import { useRouter } from "next/navigation";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import LogoInformation from "./LogoInformation";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { GoogleLogin } from "@react-oauth/google";

const Register = ({ setIsLogin, isOpen, setIsOpen }) => {
  const { logIn } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters"),

    email: Yup.string().required("Email is required"),
    phone: Yup.string()
      .required("Phone Number is required")
      .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
    password: Yup.string().required("Password is required"),
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [id]: newValue });
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const validate = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const formattedErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      try {
        const response = await apiClient.post("/user/register", formData);

        if (response.ok) {
          toast.success("Form submitted successfully!");

          setTimeout(() => {
            setIsOpen(false);
            logIn(response.data.token);
          }, 1000);
        } else {
          console.log(response.error);
          toast.error("Failed to register. Please try again.");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      toast.error("Please correct the errors before submitting.");
    }
  };

  const handleInputNumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    e.target.value = inputValue;
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;

    try {
      const response = await apiClient.post("/user/auth-google", {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        jwtToken: idToken,
      });

      if (response?.ok) {
        toast.success(response.data.message?.en || "Registration successful");
        logIn(response.data.token);
        setTimeout(() => {
          setIsOpen(false);
        }, 1000);
      } else {
        toast.error(response.data.message?.en || "Google registration failed");
      }
    } catch (error) {
      console.error("Google registration failed:", error);
      toast.error("Google registration failed. Please try again.");
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google Login Failed");
  };

  return (
    <>
      <LogoInformation />
      <form onSubmit={handleSubmit}>
        <InputField
          id="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          placeholder=" "
        />
        <InputField
          id="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder=" "
        />
        <InputField
          id="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          maxLength={10}
          onInput={handleInputNumber}
          placeholder=" "
        />
        <div className="relative">
          <InputField
            id="password"
            label="Password"
            type={isPasswordVisible ? "text" : "password"} // Toggle input type based on state
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder=" "
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <BiSolidHide className="text-lg" />
            ) : (
              <BiSolidShow className="text-lg" />
            )}
          </button>
        </div>

        <button
          className="bg-btnBg-primary text-white w-full font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="w-full ">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginError}
            size="large"
            text="continue_with"
            logo_alignment="center"
            shape="rectangular"
            width={"100%"}
          />
        </div>
      </form>

      <Toaster position="bottom-right" />
    </>
  );
};

export default Register;
