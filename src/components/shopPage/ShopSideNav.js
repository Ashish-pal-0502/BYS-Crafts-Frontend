import React, { useEffect, useState } from "react";

import Category from "./shopBy/Category";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
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

const ShopSideNav = ({
  productsss,
  subCatgary,
  selectedSubcategory,
  handleSubcategory,
  handleChanges,
  range,
}) => {
  const [open, setOpen] = useState(0);
  const [opens, setOpens] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpens = (value) => setOpens(opens === value ? 0 : value);

  const categories = [
    ...new Set(productsss?.map((product) => product.category)),
  ];

  const min = 0;
  const max = 250000000;
  const price = true;
  // const minprice = price ? min : 0;
  // const maxprice = price ? max : 250000000;
  const firstCategory = categories?.length > 0 ? categories[0] : null;
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="text-xs font-medium">
        Home / category / {firstCategory?.name}{" "}
      </div>
      <p className="text-2xl font-medium">Filters </p>
      <div>
        <Accordion open={opens === 1} icon={<Icon id={1} open={opens} />}>
          <AccordionHeader
            onClick={() => handleOpens(1)}
            className="text-base font-poppins text-black lg:text-md font-semibold"
          >
            Price
          </AccordionHeader>
          <AccordionBody className="text-sm font-poppins lg:text-md leading-7 mt-2">
            <div className="  ml-3 md:w-[90%] lg:w-[75%]">
              <Slider
                sx={{
                  "& .MuiSlider-track": {
                    backgroundColor: "#e2413e",
                    border: "#e2413e",
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#e2413e",
                    border: "#e2413e",
                  },
                }}
                value={range}
                onChange={handleChanges}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
              />
            </div>
            <div className=" ml-3 font-medium ">
              Min : {range[0]} - Max : {range[1]}
            </div>
          </AccordionBody>
        </Accordion>
      </div>
      <Category categories={categories} />
      {/* <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="text-base font-poppins text-black lg:text-md font-semibold"
        >
          Subcategory
        </AccordionHeader>
        <AccordionBody className="text-sm font-poppins lg:text-md leading-7 mt-2 flex flex-col">
          {subCatgary?.length === 0 ? (
            <p>No Sub categories available</p>
          ) : (
            subCatgary?.map((subCategory, index) => (
              <Checkbox
                key={index}
                label={subCategory.name}
                // checked={selectedSubcategory._id === subCategory._id}

                onChange={() => handleSubcategory(subCategory)}
              />
            ))
          )}
        </AccordionBody>
      </Accordion> */}
    </div>
  );
};

export default ShopSideNav;
