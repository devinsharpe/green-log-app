import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";

import Header from "../components/Header";
import Loader from "../components/Loader";

const Plants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [plants, setPlants] = useState([]);
  const [popularPlants, setPopularPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useRecoilValue(userState);
  useEffect(async () => {
    let res = await fetch(
      `http://${window.location.hostname}:5000/plants/popular/`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setPopularPlants(await res.json());
    setIsLoading(false);
  }, []);

  const search = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentSearch(searchTerm);
    let res = await fetch(
      `http://${window.location.hostname}:5000/plants/search/${searchTerm}/`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    let data = await res.json();
    setCurrentPage(data.page);
    setPageCount(data.totalPages);
    setPlants(data.results);
    setIsLoading(false);
  };

  const nextPage = async () => {
    if (currentPage < pageCount) {
      setIsLoading(true);
      let res = await fetch(
        `http://${
          window.location.hostname
        }:5000/plants/search/${searchTerm}/?page=${currentPage + 1}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      let data = await res.json();
      setCurrentPage(data.page);
      setPageCount(data.totalPages);
      setPlants(data.results);
      setIsLoading(false);
    }
  };

  const previousPage = async () => {
    console.log(currentPage);
    if (currentPage > 1) {
      setIsLoading(true);
      let res = await fetch(
        `http://${
          window.location.hostname
        }:5000/plants/search/${searchTerm}/?page=${currentPage - 1}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      let data = await res.json();
      setCurrentPage(data.page);
      setPageCount(data.totalPages);
      setPlants(data.results);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header showNav text="PlantPedia" />
      <main className="w-full container flex flex-col items-start space-y-8 px-4 mt-8 text-black dark:text-white">
        <form className="flex items-center w-full" onSubmit={search}>
          <fieldset className="focus-fieldset w-full">
            <label htmlFor="search">Search</label>
            <div className="flex items-center space-x-2">
              <input
                name="search"
                id="search"
                type="text"
                className="input w-full"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn-primary">
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    d="M15.771 15.463c-.064-.062-.145-.078-.227-.094 1.527-1.637 2.383-3.739 2.383-5.987a8.747 8.747 0 00-2.58-6.231A8.757 8.757 0 009.113.567a8.762 8.762 0 00-6.236 2.584 8.75 8.75 0 00-2.58 6.233c0 2.354.918 4.569 2.584 6.233a8.752 8.752 0 006.232 2.582c2.246 0 4.35-.856 5.984-2.381.016.081.031.162.092.225l7.135 7.133a.407.407 0 00.578 0 .41.41 0 000-.579l-7.131-7.134zm-1.005-.425a7.947 7.947 0 01-5.652 2.342 7.953 7.953 0 01-5.654-2.342 7.946 7.946 0 01-2.342-5.654 7.934 7.934 0 012.34-5.654 7.951 7.951 0 015.656-2.344c2.135 0 4.143.833 5.654 2.344a7.945 7.945 0 012.342 5.652 7.964 7.964 0 01-2.344 5.656z"
                    fill="currentColor"
                  />
                  <path
                    d="M2.457 9.386h.818a5.847 5.847 0 015.838-5.838v-.819a6.664 6.664 0 00-6.656 6.657z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </fieldset>
        </form>

        {isLoading ? (
          <div className="w-full h-full flex iems-center justify-center">
            <Loader />
          </div>
        ) : (
          <section className="grid md:grid-cols-2 gap-4 w-full">
            {currentSearch ? (
              <>
                <h3 className="md:col-span-2 font-semibold font-serif text-xl pb-4 border-b w-full">
                  Search Results
                </h3>
                {plants.map((plant) => {
                  return (
                    <div
                      className="group w-full p-2 bg-gray-100 dark:bg-gray-800 border border-transparent hover:border-gray-300 transition-colors duration-150 rounded overflow-hidden flex items-center justify-between space-x-4"
                      key={plant._id}
                    >
                      <div>
                        <h4 className="font-serif font-semibold text-2xl group-hover:underline cursor-pointer">
                          {plant.commonName}
                        </h4>
                        <h5 className="opacity-50">{plant.scientificName}</h5>
                        {plant.familyCommonName && (
                          <h5 className="opacity-50">
                            &#183;&nbsp;{plant.familyCommonName}
                          </h5>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <h3 className="md:col-span-2 font-semibold font-serif text-xl pb-4 border-b w-full">
                  Popular Plants
                </h3>
                {popularPlants.map((plant) => {
                  return (
                    <div
                      className="group w-full p-2 bg-gray-100 dark:bg-gray-800 border border-transparent hover:border-gray-300 transition-colors duration-150 rounded overflow-hidden flex space-x-2"
                      key={plant._id}
                    >
                      <div>
                        <h4 className="font-serif font-semibold text-2xl group-hover:underline cursor-pointer">
                          {plant.commonName}
                        </h4>
                        <h5 className="opacity-50">{plant.scientificName}</h5>
                        {plant.familyCommonName && (
                          <h5 className="opacity-50">
                            &#183;&nbsp;{plant.familyCommonName}
                          </h5>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            <div className="md:col-span-2 py-4 font-serif flex items-center justify-center space-x-4">
              <button
                className="px-8 py-2 rounded border border-transparent hover:border-gray-300"
                disabled={currentPage <= 1}
                onClick={previousPage}
              >
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
                <span>{currentPage}</span>
                <span>/</span>
                <span>{pageCount}</span>
              </div>
              <button
                className="px-8 py-2 rounded border border-transparent hover:border-gray-300"
                disabled={currentPage >= pageCount}
                onClick={nextPage}
              >
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
        )}
      </main>
    </>
  );
};

export default Plants;
