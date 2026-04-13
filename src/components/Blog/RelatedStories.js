

"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";
import Link from "next/link";
import BlogCard from './BlogCard';

const RelatedStories = ({ currentId }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await apiClient.get("/blog", { pageNumber: 1 });

      if (res.ok) {
        const filtered = res.data.blogs
          ?.filter((b) => b._id !== currentId)
          ?.slice(0, 3);

        setBlogs(filtered);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-bg-dark  py-16 px-5 md:px-10 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primaryText">
            Related stories
          </h2>

          <Link
            href="/blogs"
            className="border border-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-white transition"
          >
            All stories
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blogData={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedStories;