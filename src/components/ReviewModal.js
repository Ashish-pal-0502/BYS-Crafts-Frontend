"use client";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { useParams } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react"; // Lucide close icon
import "react-toastify/dist/ReactToastify.css";

const ReviewModal = ({ isOpen, onClose }) => {
  const router = useParams();
  const productId = router.product;
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    rating: Yup.number().required("Rating is required"),
    comment: Yup.string().required("Comment is required"),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      const response = await apiClient.post("/product/create-review", {
        productId: productId,
        user,
        rating: formData.rating,
        comment: formData.comment,
      });

      if (response.ok) {
        toast.success("Review submitted successfully!", {
          id: "review-success-toast",
          duration: 1000,
        });

        setTimeout(() => {
          setFormData({ rating: 0, comment: "" });
          onClose();
        }, 1000);
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setFormData({ ...formData, rating: i })}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            color: i <= formData.rating ? "#facc15" : "#d1d5db",
            padding: "5px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

            {/* Star rating */}
            <div className="flex items-center mb-3">{renderStars()}</div>
            {errors.rating && (
              <div className="text-red-500 text-sm mb-2">{errors.rating}</div>
            )}

            {/* Comment box */}
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Your comment..."
              className="w-full border rounded-md py-2 px-3 mb-3 resize-none focus:ring-2 focus:ring-red-400 outline-none"
              rows="4"
            />
            {errors.comment && (
              <div className="text-red-500 text-sm mb-2">{errors.comment}</div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Submit Review
            </button>
          </div>

          <Toaster position="bottom-right" />
        </div>
      )}
    </>
  );
};

export default ReviewModal;
