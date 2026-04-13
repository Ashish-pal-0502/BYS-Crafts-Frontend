import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import apiClient from "@/api/client";
import Link from "next/link";

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

const MobNavItems = ({ setIsOpen }) => {
  const [open, setOpen] = useState(0);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    try {
      const response = await apiClient.get("/variation/category/get");

      if (response.ok) {
        setCategories(response.data);
      } else {
        setError(error.status);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="text-base font-poppins text-black lg:text-md font-semibold"
        >
          Categories
        </AccordionHeader>
        <AccordionBody className="text-base font-poppins lg:text-md leading-7 mt-2">
          {/* <ul className="text-gray-500 "> */}
          {categories.map((catData) => (
            <div key={catData._id}>
              <ul className="mt-3 text-[15px]">
                <li>
                  <div
                    className="flex w-full items-center"
                    onClick={closeModal}
                  >
                    <div
                      className="h-[30px] w-[30px] hover:scale-105 transition-all duration-500 cursor-pointer rounded-md bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${catData.image})`,
                      }}
                    ></div>

                    <div className="flex-1">
                      <Link
                        href={`/category/${catData._id}`}
                        className="block p-2 ml-2 rounded-lg hover:bg-primary-hover hover:from-indigo-50 hover:to-pink-50 hover:via-red-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-white"
                      >
                        {catData.name}
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}

          {/* </ul> */}
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default MobNavItems;
