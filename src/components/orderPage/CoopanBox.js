"use client";
import React from "react";

const CoopanBox = ({ coupans }) => {
  return (
    <>
      <div className="  items-center w-11/12 border border-gray-300 p-4 rounded-lg">
        <div className="text-sm mb-4">All Coupons</div>

        {coupans.map((coupans) => (
          <div className="  items-center w-full border border-gray-300 p-4 ">
            <div className="flex justify-between items-center">
              <div className="flex-1 ml-4">
                <p className="text-sm text-gray-600">{coupans?.name}</p>
                <p className="text-xs text-gray-500">
                  Any 2 eligible products at ₹{coupans?.discount}
                </p>
              </div>
              <button className="text-red-500  underline">Apply</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CoopanBox;
