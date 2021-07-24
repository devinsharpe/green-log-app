import React from "react";
import { useRecoilValue } from "recoil";

import { accountState } from "../atoms/account";

import Header from "../components/Header";
import PlantListItem from "../components/PlantListItem";

const Home = () => {
  const account = useRecoilValue(accountState);

  return (
    <>
      <Header showNav text={account.home.name} />
      <main className="w-full container flex flex-col items-start space-y-8 px-4 mt-8 text-black dark:text-white">
        <button className="w-full btn-primary">Add a Plant</button>
        <h2 className="font-semibold font-serif text-3xl pb-4 border-b w-full">
          Favorite Plants
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <PlantListItem />
          <PlantListItem />
          <PlantListItem />
          <PlantListItem />
          <PlantListItem />
          <PlantListItem />
        </section>
        <h2 className="font-semibold font-serif text-3xl pb-4 border-b w-full">
          Other Plants
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <PlantListItem />
          <PlantListItem />
          <PlantListItem />
          <PlantListItem />
          <PlantListItem />
          <PlantListItem />
          <div className="md:col-span-2 py-4 font-serif flex items-center justify-center space-x-4">
            <button className="px-8 py-2 rounded border border-transparent hover:border-gray-300">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                width="24"
              >
                <path
                  d="M11.389 5.328H1.576L6.369.703a.408.408 0 10-.568-.589L0 5.708l.283.295c.002 0 .002.002.002.002l5.311 5.508a.413.413 0 00.58.01.411.411 0 00.01-.58L1.561 6.148h9.828c.231 0 .321-.255.321-.438s-.094-.378-.321-.382z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <div className="flex items-center pb-1 border-b px-2 space-x-2 text-xl">
              <span>1</span>
              <span>/</span>
              <span>5</span>
            </div>
            <button className="px-8 py-2 rounded border border-transparent hover:border-gray-300">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                width="24"
              >
                <path
                  d="M.321 6.309h9.813l-4.793 4.625a.408.408 0 10.568.589l5.801-5.594-.283-.295c-.002 0-.002-.002-.002-.002L6.114.124a.413.413 0 00-.58-.009.411.411 0 00-.01.579l4.625 4.795H.321c-.231 0-.321.255-.321.438s.094.378.321.382z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
