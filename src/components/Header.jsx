import React from "react";

import Navigation from "./Navigation";

const Header = ({ showNav, text, ...rest }) => {
  return (
    <header
      {...rest}
      className="w-full pt-10 px-4 flex items-center justify-center text-gray-700 dark:text-gray-300"
    >
      <div className="container w-full">
        {showNav && <Navigation />}
        <h1 className="font-serif pb-6 border-b border-gray-700 dark:border-gray-300 text-2xl font-bold tracking-tight text-center">
          {text}
        </h1>
      </div>
    </header>
  );
};

export default Header;
