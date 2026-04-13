// import React from "react";

// const InputField = ({
//   id,
//   label,
//   value,
//   onChange,
//   error,
//   placeholder,
//   maxLength,
//   onInput,
// }) => {
//   return (
//     <div className="mb-4 relative">
//       <input
//         type="text"
//         id={id}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         onInput={onInput}
//         maxLength={maxLength}
//         className={`peer shadow appearance-none border ${
//           error ? "border-red-700 rounded " : "rounded"
//         } w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white`}
//       />
//       <label
//         htmlFor={id}
//         className="absolute left-3 -top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm bg-white px-1"
//       >
//         {label}
//       </label>
//       {error && <p className="text-red-700 text-xs ">{error}</p>}
//     </div>
//   );
// };

// export default InputField;
// InputField.js
import React from "react";

const InputField = ({
  id,
  label,
  type, // Add type prop
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  onInput,
}) => {
  return (
    <div className="mb-4 relative">
      <input
        type={type} // Use type prop
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={onInput}
        maxLength={maxLength}
        className={`peer shadow appearance-none border ${
          error ? "border-red-700 rounded " : "rounded"
        } w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white`}
      />
      <label
        htmlFor={id}
        className="absolute left-3 -top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm bg-white px-1"
      >
        {label}
      </label>
      {error && <p className="text-red-700 text-xs ">{error}</p>}
    </div>
  );
};

export default InputField;
