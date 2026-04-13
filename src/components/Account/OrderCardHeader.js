import React from "react";

const OrderCardHeader = () => {
  return (
    <>
      <div className="p-4 border-b border-gray-500 bg-red-500 rounded-t-xl flex flex-wrap">
        <div className="w-full md:w-1/4 p-1">
          <div className="w-full flex justify-between md:block">
            <div className="text-white text-sm pr-4 font-normal">
              ORDER PLACED
            </div>
            <div className="text-white text-sm">05 April 2024</div>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-1">
          {/* Column 2 content */}
          <div className="w-full flex justify-between md:block">
            <div className="text-white text-sm pr-4 font-normal">TOTAL :</div>
            <div className="text-white text-sm">RS. 1,099.00</div>
          </div>{" "}
        </div>
        <div className="w-full md:w-1/4 p-1">
          {/* Column 3 content */}
          <div className="w-full flex justify-between md:block">
            <div className="text-white text-sm pr-4 font-normal">SHIP TO :</div>
            <div className="text-white text-sm"> Vimal Raj Lucknow</div>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-1">
          {/* Column 4 content */}
          <div className="w-full flex justify-between md:block">
            <div className="text-white text-sm pr-4 font-normal">
              ORDER # 404-613-806
            </div>
            <div className="text-white text-sm">Invoice</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCardHeader;
