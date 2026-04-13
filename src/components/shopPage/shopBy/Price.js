"use client";
import React, { useState } from "react";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Slider from "@mui/material/Slider";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Price = () => {
  const [open, setOpen] = useState(0);
  const [range, setRange] = useState([5, 30]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleChanges = (event, newValue) => setRange(newValue);

  return (
    <div>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="text-base font-poppins text-black lg:text-md font-semibold"
        >
          Price
        </AccordionHeader>
        <AccordionBody className="text-sm font-poppins lg:text-md leading-7 mt-2">
          <Slider
            className="w-56 m-3 text-red-500"
            value={range}
            onChange={handleChanges}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
          <div className=" ml-3 font-medium ">
            Min : {range[0]} - Max : {range[1]}
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default Price;
