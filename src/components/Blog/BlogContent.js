"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Parser } from "html-to-react";
import apiClient from "@/api/client";
import Loader from "../loader/Loader";

import RelatedStories from './RelatedStories';

const getReadingTime = (html) => {
  const text = html.replace(/<[^>]*>?/gm, "");
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
};

const BlogContent = ({ blogid }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const articleRef = useRef();

  console.log("data", data)

  useEffect(() => {
    fetchBlog();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await apiClient.get(
        `blog/blogbyid/${blogid.blogDetail}`
      );

      if (res.ok) {
        setData(res.data);
        setReadingTime(getReadingTime(res.data.content));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!articleRef.current) return;

    const total =
      articleRef.current.offsetHeight - window.innerHeight;
    const current = window.scrollY - articleRef.current.offsetTop;

    if (current >= 0) {
      setProgress(Math.min((current / total) * 100, 100));
    }
  };

  const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const handleShare = async () => {
  if (!navigator.share) {
    alert("Sharing not supported on this browser");
    return;
  }

  try {
    await navigator.share({
      title: data.heading,
      text: data.mdesc,
      url: window.location.href,
    });
  } catch (err) {
    console.log(err);
  }
};

  if (loading) return <Loader />;

  return (
    <div className="bg-[#FAF6ED]">
      <div
        className="fixed top-0 left-0 h-1 bg-text-yellowText z-50"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-4xl mx-auto px-5 md:px-10 py-16">
        <p className="text-xs tracking-widest uppercase text-text-yellowText text-center mb-3">
          Artisan Profile
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-center text-text-primaryText leading-tight mb-4">
          {data.heading}
        </h1>

        <p className="text-center text-text-secondaryText max-w-2xl mx-auto text-sm md:text-base mb-6">
          {data.mdesc}
        </p>

       
<div className="flex items-center justify-center gap-4 text-sm text-text-secondaryText mb-10">

  <span>
    {new Date(data.createdAt).toLocaleDateString("en-IN")}
  </span>

  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>

  <span>{readingTime} min read</span>

  <span className="w-px h-4 bg-gray-300 mx-2"></span>

  <button
    onClick={handleShare}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-white transition"
  >
    <Image
      src="/share.png"
      alt="share"
      width={14}
      height={14}
    />
    <span className="text-xs">Share</span>
  </button>

</div>

        {data.image?.[0] && (
          <div className="relative h-[260px] md:h-[420px] rounded-3xl overflow-hidden mb-12">
            <Image
              src={data.image[0]}
              alt={data.heading}
              fill
              className="object-cover"
            />
          </div>
        )}

        <article
          ref={articleRef}
          className="prose prose-lg max-w-none text-gray-800"
        >
          {Parser().parse(data.content || "")}
        </article>
       
      
        <div className="mt-10 bg-[#EFE7D6] rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center">
          {getInitials(data?.user)}
          </div>
          <div>
            <h4 className="font-semibold text-text-primaryText">
              {data?.user}
            </h4>
            <p className="text-sm text-text-secondaryText">
              Editorial lead documenting Indian craft traditions.
            </p>
          </div>
        </div>
      </div>

      <RelatedStories currentId={data._id} />
    </div>
  );
};

export default BlogContent;