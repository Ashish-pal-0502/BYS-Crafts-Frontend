


// "use client";
// import React from "react";
// import Image from "next/image";

// const NewOrderChild = ({ orderData }) => {
//   return (
//     <div className="bg-[#f8f3eb] border border-[#e6dfd5] rounded-xl mb-5 overflow-hidden">

//       {/* HEADER */}
//       <div className="flex justify-between items-center px-4 py-3 bg-[#efe7dc]">
//         <div className="text-xs text-gray-600">
//           #{orderData?._id?.slice(-10)} •{" "}
//           {new Date(orderData.createdAt).toDateString()}
//         </div>

//         <span className="text-xs bg-[#f4c430] text-[#7a5c00] px-3 py-1 rounded-full">
//           Processing
//         </span>
//       </div>

//       {/* ITEMS */}
//       {orderData.orderItems.map((item) => (
//         <div
//           key={item._id}
//           className="flex justify-between items-center px-4 py-3 border-t border-[#e6dfd5]"
//         >
//           <div className="flex gap-3 items-center">
//             <Image
//               src={item.image}
//               width={55}
//               height={55}
//               alt="product"
//               className="rounded-md object-cover"
//             />

//             <div>
//               <p className="text-sm font-medium text-[#2c2c2c]">
//                 {item.name}
//               </p>
//               <p className="text-xs text-gray-500">
//                 Qty: {item.qty}
//               </p>
//             </div>
//           </div>

//           <div className="text-sm font-semibold text-[#2c2c2c]">
//             ₹{item.price}
//           </div>
//         </div>
//       ))}

//       {/* FOOTER */}
//       <div className="flex justify-between items-center px-4 py-3 border-t border-[#e6dfd5]">
//         <p className="text-sm text-gray-600">
//           Order total:{" "}
//           <span className="font-semibold text-[#2c2c2c]">
//             ₹{orderData.totalPrice}
//           </span>
//         </p>

//         <div className="flex gap-2">
//           <button className="border border-[#d6cec2] px-3 py-1 rounded-md text-xs hover:bg-[#efe7dc]">
//             Track order
//           </button>
//           <button className="border border-[#d6cec2] px-3 py-1 rounded-md text-xs hover:bg-[#efe7dc]">
//             Invoice
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewOrderChild;

"use client";
import React from "react";
import Image from "next/image";

const NewOrderChild = ({ orderData }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-[#FAF6ED] border border-[#1B3A5C0F] rounded-2xl mb-6 overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-center px-5 py-3 bg-[#e9e1d5]">
        <div className="text-[13px] text-gray-600 font-medium">
          #{orderData?._id?.slice(-12)} •{" "}
          {new Date(orderData.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>

        <span
          className={`text-[11px] px-3 py-[5px] rounded-full font-medium ${getStatusStyle(
            orderData.status
          )}`}
        >
          {orderData.status || "Processing"}
        </span>
      </div>

      {/* ITEMS */}
      <div className="divide-y divide-[#e2dbcf]">
        {orderData.orderItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center px-5 py-4"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              
              {/* IMAGE BOX (like screenshot beige box) */}
              <div className="w-[52px] h-[52px] bg-[#e6dfd2] rounded-md flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    width={48}
                    height={48}
                    alt="product"
                    className="object-cover rounded"
                  />
                ) : (
                  <span className="text-[10px] text-gray-500">
                    Product
                  </span>
                )}
              </div>

              {/* TEXT */}
              <div>
                <p className="text-[14px] font-medium text-[#2f2f2f]">
                  {item.name}
                </p>

                <p className="text-[12px] text-gray-500 mt-[2px]">
                  Qty: {item.qty}
                </p>
              </div>
            </div>

            {/* PRICE */}
            <div className="text-[14px] font-semibold text-[#2f2f2f]">
              ₹{item.price}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center px-5 py-4 border-t border-[#e2dbcf]">
        <p className="text-[14px] text-gray-600">
          Order total:{" "}
          <span className="font-semibold text-[#2f2f2f]">
            ₹{orderData.totalPrice}
          </span>
        </p>

        <div className="flex gap-3">
          <button className="text-[12px] px-4 py-[6px] border border-[#d8d1c5] rounded-lg text-gray-600 hover:bg-[#e9e1d5] transition">
            Track order
          </button>

          <button className="text-[12px] px-4 py-[6px] border border-[#d8d1c5] rounded-lg text-gray-600 hover:bg-[#e9e1d5] transition">
            Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderChild;