"use client";
import Link from "next/link";
import { FaClock } from "react-icons/fa";

const BlogCard = ({ blogData }) => {
  const words = blogData?.content?.split(/\s+/).length || 0;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="bg-[#FAF6ED] rounded-2xl overflow-hidden border border-[#1B3A5C0F] transition">

      <Link href={`/blogs/${blogData._id}`}>
        <div className="h-[180px] bg-[#EAE2D6]">
          <img
            src={blogData?.image?.[0]}
            alt={blogData?.heading}
            className="w-full h-full object-cover cursor-pointer "
          />
        </div>
      </Link>

      <div className="p-4 space-y-3">

        <p className="text-[10px] uppercase tracking-widest text-text-yellowText">
          Craft Story
        </p>

        <Link href={`/blogs/${blogData._id}`}>
          <h3 className="text-base cursor-pointer  font-semibold text-text-primaryText leading-snug line-clamp-2 hover:underline">
            {blogData.heading}
          </h3>
        </Link>

        <p className="text-sm text-text-secondaryText line-clamp-2">
          {blogData.mdesc || "No description"}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
          <span>
            {new Date(blogData.createdAt).toDateString()}
          </span>

          <div className="flex items-center gap-1">
            <FaClock />
            <span>{readTime} min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;