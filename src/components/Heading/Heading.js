import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="text-center text-2xl font-semibold leading-5 uppercase px-1.5">
      <p>{title}</p>
    </div>
  );
};

export default Heading;
