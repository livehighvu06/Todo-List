/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Nav() {
  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div>
          <a
            className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
            href="#"
          >
            <img
              className="mr-2"
              src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
              style={{ height: "20px" }}
              alt="TE Logo"
              loading="lazy"
            />
            <span className="font-medium dark:text-neutral-200">
              TW elements DEMO
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
