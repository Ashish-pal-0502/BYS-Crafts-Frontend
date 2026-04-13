


import React from "react";
import NewOrderCard from "./NewOrderCard";

const OrderPage = () => {
  return (
    <div className=" ">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Recent orders</h2>
        <button className="text-sm border border-[#1B3A5C] px-3 py-3 rounded-md">
          View all orders
        </button>
      </div>

      <NewOrderCard />
    </div>
  );
};

export default OrderPage;