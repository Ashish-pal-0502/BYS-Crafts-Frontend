import { useParams } from "next/navigation";
import React from "react";

const OrderAddress = ({ mydata }) => {
  console.log(mydata?.shippingAddress);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 ">
        <div className=" ">
          <div className="border-b-2 p-3-b-2 mb-4 font-semibold text-gray-600 text-xl">
            Order Details
          </div>
          <div className="font-semibold text-gray-600 text-lg">
            <div className="mb-2">Order Id : {mydata?._id}</div>

            <div className="mb-2">
              Order Date :{" "}
              {mydata ? new Date(mydata.createdAt).toLocaleString() : "N/A"}
            </div>
            <div className="mb-2">Payment Mode : {mydata?.paymentMethod}</div>
            <div className="mb-2">
              Shipping Price : ₹{mydata?.shippingPrice}
            </div>
            <div className="mb-2">Total Price : ₹{mydata?.totalPrice}</div>

            <div className="mb-2">Tracking ID/AWB : {mydata?.wayBill}</div>
          </div>
          <div className="border p-3-2 text-lg p-2 text-green-600">
            Order Status Message : {mydata?.deliveryStatus}
          </div>
        </div>
        <div className=" ">
          <div className="border-b-2 p-3-b-2 mb-4 font-semibold text-gray-600 text-xl">
            Shipping Details
          </div>
          <div className="font-semibold text-gray-600 text-lg">
            <div className="mb-2">
              Address : {mydata?.shippingAddress?.address}
            </div>
            <div className="mb-2">Area : {mydata?.shippingAddress?.area}</div>
            <div className="mb-2">City: {mydata?.shippingAddress?.city}</div>
            <div className="mb-2">
              Landmark : {mydata?.shippingAddress?.landmark}
            </div>
            <div className="mb-2">State : {mydata?.shippingAddress?.state}</div>
          </div>
        </div>
        <div className=" ">
          <div className="border-b-2 p-3-b-2 mb-4 font-semibold text-gray-600 text-xl">
            Customer Details
          </div>
          <div className="font-semibold text-gray-600 text-lg">
            <div className="mb-2">Name : {mydata?.user?.name}</div>
            <div className="mb-2">Email : {mydata?.user?.email}</div>
            <div className="mb-2">
              Phone No.: {mydata?.shippingAddress?.mobileNumber}
            </div>
            <div className="mb-2">
              {/* Address : {myOrder?.shippingAddress?.address} */}
            </div>
            {mydata?.shippingAddress?.pincode && (
              <div className="mb-2">
                Pin code : {mydata?.shippingAddress?.pincode}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderAddress;
