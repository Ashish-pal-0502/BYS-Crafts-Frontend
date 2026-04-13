import React from "react";

const CoopanForm = () => {
  return (
    <form className="flex">
      <div className="flex-1 mr-4">
        <input
          type="text"
          id="name"
          name="name"
          className=" px-4mt-1 p-2 block w-full border rounded-md  "
          placeholder="Discount code or gift card"
        />
      </div>
      <div>
        <button className="  bg-red-500 text-white  py-2 px-4 rounded-md hover:bg-red-600   ">
          Apply
        </button>
      </div>
    </form>
  );
};

export default CoopanForm;
