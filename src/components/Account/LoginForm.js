import React, { useState } from "react";
import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
import InputField from "./InputField";
import LogoInformation from "./LogoInformation";
import { useRouter } from "next/navigation";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = ({ setIsRegistering, isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const { logIn } = useAuth();
  const handleInputChange = (e) => {
    const { id, value, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [id]: newValue });
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };




  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        const response = await apiClient.post("/user/login", formData);

        if (response.ok) {
          toast.success("Login successful!", {
            id: "login-success-toast",
            duration: 1000,
          });
          logIn(response.data.token);

          setTimeout(() => {
            setIsOpen(false);
          }, 500);
        } else {
          console.error("Login failed:");
          toast.error(response?.data?.message||"Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      toast.error("Please correct the errors before submitting.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;
    
    try {
      const response = await apiClient.post("/user/auth-google", {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        jwtToken: idToken,
      });

      console.log("response", response)

      if (response?.ok) {
        toast.success(response.data.message?.en || "Login successful");

        logIn(response.data.token);
        setTimeout(() => {
          setIsOpen(false);
        }, 500);
      } else {
        toast.error(response.data.message?.en || "Google login failed");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
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
          id="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
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
          className="bg-btnBg-primary text-white w-full font-bold py-3 px-4  focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={() => setIsOpen(true)}
        >
          Login
        </button>
        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="w-full">
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

      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <Toaster position="bottom-right" />
    </>
  );
};

export default LoginForm;
