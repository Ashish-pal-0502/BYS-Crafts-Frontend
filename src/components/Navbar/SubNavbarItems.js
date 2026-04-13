import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

const SubNavbarItems = ({ items, heading }) => {
  const [isOpen, setIsOpen] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Menu
        as="div"
        className="relative inline-block text-left"
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-white   hover:underline">
            {heading}
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          show={isOpen}
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className=" absolute  z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {items.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href={item.link}
                      className={classNames(
                        "block px-4 py-2 text-sm",
                        active ? "text-gray-900 underline" : "text-gray-700"
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default SubNavbarItems;
