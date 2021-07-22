import React from "react";
import { useRecoilValue } from "recoil";

import { accountState } from "../atoms/account";

const Home = () => {
  const account = useRecoilValue(accountState);
  console.log(account);
  return (
    <>
      <header className="w-full pt-10 px-4 flex items-center justify-center text-gray-700 dark:text-gray-300">
        <div className="container w-full">
          <button
            type="button"
            className="fixed top-10 left-10 h-8 w-8 bg-white dark:bg-gray-900 flex items-center justify-center rounded border text-gray-700 dark:text-gray-300"
          >
            <svg
              width="19"
              height="18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.65.663H1.129a.409.409 0 100 .819H17.65a.41.41 0 000-.819zM1.129 6.99h11.457c.226 0 .41-.185.41-.41a.411.411 0 00-.41-.41H1.129a.41.41 0 000 .82zM1.129 12.496h11.348a.41.41 0 000-.819H1.129a.41.41 0 000 .819zM17.65 17.18H1.129a.41.41 0 000 .82H17.65a.411.411 0 000-.82z"
                fill="currentColor"
              />
            </svg>
          </button>
          <h1 className="font-serif pb-6 border-b border-gray-700 dark:border-gray-300 text-2xl font-bold tracking-tight text-center">
            GreenLog
          </h1>
        </div>
      </header>
    </>
  );
};

export default Home;
