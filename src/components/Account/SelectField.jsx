import React from "react";

const SelectField = ({ id, label, value, onChange, error, children }) => {
  return (
    <div className="mb-4 relative">
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`peer shadow appearance-none border ${
            error ? "border-red-500  rounded" : "rounded"
          } w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white`}
        >
          {children}
        </select>
        <label
          htmlFor={id}
          className="absolute left-3 -top-3.5 text-gray-500 text-sm transition-all peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm bg-white px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500"
        >
          {label}
        </label>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {error && <p className="text-red-700 text-xs ">{error}</p>}
      </div>
    </div>
  );
};

export default SelectField;
