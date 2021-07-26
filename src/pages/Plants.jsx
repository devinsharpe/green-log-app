import React, { Fragment, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Dialog, Disclosure, Transition } from "@headlessui/react";

import Header from "../components/Header";
import Loader from "../components/Loader";

import { userState } from "../atoms/user";

const PlantModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [plantData, setPlantData] = useState(null);
  const user = useRecoilValue(userState);

  useEffect(async () => {
    if (props.plant) {
      setIsLoading(true);
      let res = await fetch(
        `http://${window.location.hostname}:5000/plants/id/${props.plant}/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        setPlantData(data);
      } else {
        setPlantData(null);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [props.plant]);

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.isOpen]);

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        onClose={props.onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-200 dark:bg-gray-800 opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block text-left w-full h-full max-w-md modal overflow-y-scroll p-4 my-8 overflow-hidden align-middle transition-all transform shadow-lg rounded bg-white dark:bg-gray-900 border border-gray-700 dark:border-gray-300 dark:text-white">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader />
                </div>
              ) : (
                <>
                  {plantData && (
                    <>
                      <div className="flex items-center justify-between space-x-4">
                        <div className="space-y-1">
                          <Dialog.Title as={Fragment}>
                            <h3 className="text-xl text-left font-medium leading-6 text-black dark:text-white">
                              {plantData.commonName}
                            </h3>
                          </Dialog.Title>

                          <h4 className="block opacity-50">
                            {plantData.scientificName}
                          </h4>
                          {plantData.familyCommonName && (
                            <h5 className="block opacity-50">
                              &#183;&nbsp;{plantData.familyCommonName}
                            </h5>
                          )}
                        </div>
                        <img
                          src={plantData.imageURL.replace("https", "http")}
                          alt=""
                          className="h-24 w-auto object-cover rounded"
                        />
                      </div>

                      <div className="mt-2"></div>
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="w-1/2 plant-tag-note">
                          <span>Edible?</span>
                          {plantData.isEdible ? (
                            <span>&#10003;</span>
                          ) : (
                            <span>&times;</span>
                          )}
                        </div>
                        <div className="w-1/2 plant-tag-note">
                          <span>Vegetable?</span>
                          {plantData.isVegetable ? (
                            <span>&#10003;</span>
                          ) : (
                            <span>&times;</span>
                          )}
                        </div>
                      </div>
                      {plantData.growth.form ||
                      plantData.growth.habit ||
                      plantData.growth.rate ||
                      plantData.height.max ||
                      plantData.height.avg ||
                      plantData.foliage.color ||
                      plantData.flower.color ||
                      plantData.fruit.color ? (
                        <div className="mt-2">
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="btn-disclosure">
                                  <span>Growth Notes</span>
                                  <svg
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`${
                                      open ? "transform rotate-180" : ""
                                    } w-4 h-4`}
                                  >
                                    <path
                                      d="M.427 6.325c.16.16.42.16.58 0l5.12-5.12 5.118 5.12a.41.41 0 10.579-.58L6.127.048.427 5.746a.412.412 0 000 .58z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="p-2 text-gray-700 dark:text-gray-200 space-y-4">
                                  <div className="grid grid-cols-2 gap-2 px-2">
                                    {plantData.growth.form && (
                                      <div className="plant-tag-note">
                                        {plantData.growth.form}
                                      </div>
                                    )}
                                    {plantData.growth.habit && (
                                      <div className="plant-tag-note">
                                        {plantData.growth.habit}
                                      </div>
                                    )}
                                    {plantData.growth.rate && (
                                      <div className="plant-tag-note">
                                        {plantData.growth.rate}
                                      </div>
                                    )}
                                  </div>
                                  {plantData.height.max ||
                                  plantData.height.avg ? (
                                    <>
                                      <h4 className="pb-1 border-b px-2">
                                        Height
                                      </h4>
                                      {(plantData.height.min ||
                                        plantData.height.max) && (
                                        <div className="flex items-center space-x-4 px-2 mt-2">
                                          <span className="whitespace-nowrap">
                                            {plantData.height.min > 500 ? (
                                              <>
                                                {plantData.height.min / 100} m
                                              </>
                                            ) : (
                                              <>{plantData.height.min} cm</>
                                            )}
                                          </span>
                                          <span className="border w-full"></span>
                                          <span className="whitespace-nowrap">
                                            {plantData.height.max > 500 ? (
                                              <>
                                                {plantData.height.max / 100} m
                                              </>
                                            ) : (
                                              <>{plantData.height.max} cm</>
                                            )}
                                          </span>
                                        </div>
                                      )}

                                      {plantData.height.avg ? (
                                        <span className="w-full block text-center">
                                          {plantData.height.avg > 500 ? (
                                            <>{plantData.height.avg / 100} m</>
                                          ) : (
                                            <>{plantData.height.avg} cm</>
                                          )}
                                        </span>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {plantData.foliage.color ||
                                  plantData.flower.color ||
                                  plantData.fruit.color ? (
                                    <div className="space-y-2">
                                      {plantData.foliage.color && (
                                        <div className="w-full plant-tag-note">
                                          <span>Foliage</span>
                                          <span>{plantData.foliage.color}</span>
                                        </div>
                                      )}
                                      {plantData.flower.color && (
                                        <div className="w-full plant-tag-note">
                                          <span>Flower</span>
                                          <span>{plantData.flower.color}</span>
                                        </div>
                                      )}
                                      {plantData.fruit.color && (
                                        <div className="w-full plant-tag-note">
                                          <span>Fruit</span>
                                          <span>{plantData.fruit.color}</span>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      ) : (
                        <></>
                      )}

                      {plantData.ph.min ||
                      plantData.ph.max ||
                      plantData.light ||
                      plantData.humidity.ground ||
                      plantData.humidity.atmospheric ? (
                        <div className="mt-2">
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="btn-disclosure">
                                  <span>Care Notes</span>
                                  <svg
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`${
                                      open ? "transform rotate-180" : ""
                                    } w-4 h-4`}
                                  >
                                    <path
                                      d="M.427 6.325c.16.16.42.16.58 0l5.12-5.12 5.118 5.12a.41.41 0 10.579-.58L6.127.048.427 5.746a.412.412 0 000 .58z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="p-2 text-gray-700 dark:text-gray-200 space-y-4">
                                  {plantData.ph.min || plantData.ph.max ? (
                                    <div>
                                      <h4 className="pb-1 border-b px-2">
                                        Soil PH
                                      </h4>
                                      <div className="flex items-center space-x-4 px-2 mt-2">
                                        <span className="whitespace-nowrap">
                                          {plantData.ph.min}
                                        </span>
                                        <span className="border w-full"></span>
                                        <span className="whitespace-nowrap">
                                          {plantData.ph.max}
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  {plantData.light ? (
                                    <div className="w-full plant-tag-note">
                                      <span>Light</span>
                                      <span>{plantData.light}</span>
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  {plantData.humidity.ground ? (
                                    <div className="w-full plant-tag-note">
                                      <span className="whitespace-nowrap truncate">
                                        Ground Humidity
                                      </span>
                                      <span>{plantData.humidity.ground}</span>
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  {plantData.humidity.atmospheric ? (
                                    <div className="w-full plant-tag-note">
                                      <span className="whitespace-nowrap truncate">
                                        Atmospheric Humidity
                                      </span>
                                      <span>
                                        {plantData.humidity.atmospheric}
                                      </span>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      ) : (
                        <></>
                      )}

                      {plantData.commonNames.length ? (
                        <div className="mt-2">
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="btn-disclosure">
                                  <span>Other Names</span>
                                  <svg
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    className={`${
                                      open ? "transform rotate-180" : ""
                                    } w-4 h-4`}
                                  >
                                    <path
                                      d="M.427 6.325c.16.16.42.16.58 0l5.12-5.12 5.118 5.12a.41.41 0 10.579-.58L6.127.048.427 5.746a.412.412 0 000 .58z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="p-2 text-gray-700 dark:text-gray-200">
                                  <ul className="space-y-1">
                                    {plantData.commonNames.map(
                                      (name, index) => (
                                        <li
                                          className={`px-2 pb-1 ${
                                            index + 1 <
                                            plantData.commonNames.length
                                              ? "border-b"
                                              : ""
                                          } dark:border-gray-600`}
                                        >
                                          {name}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="mt-2">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="btn-disclosure">
                                <span>External Resources</span>
                                <svg
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 12 7"
                                  className={`${
                                    open ? "transform rotate-180" : ""
                                  } w-4 h-4`}
                                >
                                  <path
                                    d="M.427 6.325c.16.16.42.16.58 0l5.12-5.12 5.118 5.12a.41.41 0 10.579-.58L6.127.048.427 5.746a.412.412 0 000 .58z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 py-2 text-gray-700 dark:text-gray-200 space-y-2">
                                {plantData.urls.wiki && (
                                  <a
                                    href={plantData.urls.wiki}
                                    target="_blank"
                                    className="flex items-center space-x-4 group"
                                  >
                                    <svg
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className="h-5 w-5"
                                    >
                                      <path
                                        d="M16.744 6.8L9.969 9.703a.41.41 0 00-.215.215L6.85 16.69a.416.416 0 00.379.572.41.41 0 00.16-.034l6.775-2.903a.415.415 0 00.217-.215l2.902-6.772a.415.415 0 00-.088-.452.414.414 0 00-.451-.086zM8.01 16.073l2.26-5.276 3.016 3.016-5.276 2.26zm5.855-2.84l-3.018-3.016 5.277-2.262-2.259 5.278z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M12.066.657C5.804.657.709 5.751.709 12.013c0 6.261 5.096 11.357 11.357 11.357 6.264 0 11.357-5.097 11.357-11.357C23.424 5.751 18.33.657 12.066.657zm0 21.895c-5.811 0-10.537-4.728-10.537-10.538 0-5.81 4.727-10.536 10.537-10.536 5.81 0 10.537 4.727 10.537 10.536.001 5.81-4.726 10.538-10.537 10.538z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M12.066 3.696a.576.576 0 000-1.152.576.576 0 000 1.152zm0-.82c.137 0 .246.109.246.244 0 .27-.49.27-.49 0 0-.135.11-.244.244-.244zM12.066 20.334a.575.575 0 000 1.149.576.576 0 000-1.149zm-.244.573c0-.135.109-.242.244-.242.137 0 .246.107.246.242 0 .274-.49.274-.49 0zM20.963 11.439a.576.576 0 000 1.151.576.576 0 000-1.151zm-.244.575a.24.24 0 01.244-.243c.135 0 .242.108.242.243 0 .274-.486.274-.486 0zM3.174 11.439a.575.575 0 10.001 1.15.575.575 0 00-.001-1.15zm-.246.575c0-.135.109-.243.246-.243.135 0 .244.108.244.243 0 .269-.49.269-.49 0z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    <span>Wikipedia</span>
                                  </a>
                                )}
                                {plantData.urls.plantnet && (
                                  <a
                                    href={plantData.urls.plantnet}
                                    target="_blank"
                                    className="flex items-center space-x-4 group"
                                  >
                                    <svg
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className="h-5 w-5"
                                    >
                                      <path
                                        d="M16.744 6.8L9.969 9.703a.41.41 0 00-.215.215L6.85 16.69a.416.416 0 00.379.572.41.41 0 00.16-.034l6.775-2.903a.415.415 0 00.217-.215l2.902-6.772a.415.415 0 00-.088-.452.414.414 0 00-.451-.086zM8.01 16.073l2.26-5.276 3.016 3.016-5.276 2.26zm5.855-2.84l-3.018-3.016 5.277-2.262-2.259 5.278z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M12.066.657C5.804.657.709 5.751.709 12.013c0 6.261 5.096 11.357 11.357 11.357 6.264 0 11.357-5.097 11.357-11.357C23.424 5.751 18.33.657 12.066.657zm0 21.895c-5.811 0-10.537-4.728-10.537-10.538 0-5.81 4.727-10.536 10.537-10.536 5.81 0 10.537 4.727 10.537 10.536.001 5.81-4.726 10.538-10.537 10.538z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M12.066 3.696a.576.576 0 000-1.152.576.576 0 000 1.152zm0-.82c.137 0 .246.109.246.244 0 .27-.49.27-.49 0 0-.135.11-.244.244-.244zM12.066 20.334a.575.575 0 000 1.149.576.576 0 000-1.149zm-.244.573c0-.135.109-.242.244-.242.137 0 .246.107.246.242 0 .274-.49.274-.49 0zM20.963 11.439a.576.576 0 000 1.151.576.576 0 000-1.151zm-.244.575a.24.24 0 01.244-.243c.135 0 .242.108.242.243 0 .274-.486.274-.486 0zM3.174 11.439a.575.575 0 10.001 1.15.575.575 0 00-.001-1.15zm-.246.575c0-.135.109-.243.246-.243.135 0 .244.108.244.243 0 .269-.49.269-.49 0z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    <span>PlantNet</span>
                                  </a>
                                )}
                                {plantData.urls.usda && (
                                  <a
                                    href={plantData.urls.usda}
                                    target="_blank"
                                    className="flex items-center space-x-4 group"
                                  >
                                    <svg
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className="h-5 w-5"
                                    >
                                      <path
                                        d="M16.744 6.8L9.969 9.703a.41.41 0 00-.215.215L6.85 16.69a.416.416 0 00.379.572.41.41 0 00.16-.034l6.775-2.903a.415.415 0 00.217-.215l2.902-6.772a.415.415 0 00-.088-.452.414.414 0 00-.451-.086zM8.01 16.073l2.26-5.276 3.016 3.016-5.276 2.26zm5.855-2.84l-3.018-3.016 5.277-2.262-2.259 5.278z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M12.066.657C5.804.657.709 5.751.709 12.013c0 6.261 5.096 11.357 11.357 11.357 6.264 0 11.357-5.097 11.357-11.357C23.424 5.751 18.33.657 12.066.657zm0 21.895c-5.811 0-10.537-4.728-10.537-10.538 0-5.81 4.727-10.536 10.537-10.536 5.81 0 10.537 4.727 10.537 10.536.001 5.81-4.726 10.538-10.537 10.538z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M12.066 3.696a.576.576 0 000-1.152.576.576 0 000 1.152zm0-.82c.137 0 .246.109.246.244 0 .27-.49.27-.49 0 0-.135.11-.244.244-.244zM12.066 20.334a.575.575 0 000 1.149.576.576 0 000-1.149zm-.244.573c0-.135.109-.242.244-.242.137 0 .246.107.246.242 0 .274-.49.274-.49 0zM20.963 11.439a.576.576 0 000 1.151.576.576 0 000-1.151zm-.244.575a.24.24 0 01.244-.243c.135 0 .242.108.242.243 0 .274-.486.274-.486 0zM3.174 11.439a.575.575 0 10.001 1.15.575.575 0 00-.001-1.15zm-.246.575c0-.135.109-.243.246-.243.135 0 .244.108.244.243 0 .269-.49.269-.49 0z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    <span>USDA</span>
                                  </a>
                                )}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={props.onClose}
                >
                  Add to Home
                </button>
                <button
                  type="button"
                  className="btn-secondary w-full"
                  onClick={props.onClose}
                >
                  <span className="leading-none text-xl">&times;</span>
                  <span>Close</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const Plants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [currentSearch, setCurrentSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <PlantModal
        isOpen={isModalOpen}
        onClose={closeModal}
        plant={currentPlant}
      />
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
                        <button
                          className="group-hover:underline"
                          onClick={() => {
                            setCurrentPlant(plant._id);
                            setIsModalOpen(true);
                          }}
                        >
                          <h4 className="font-serif font-semibold text-2xl cursor-pointer">
                            {plant.commonName}
                          </h4>
                        </button>

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
                        <button
                          className="group-hover:underline"
                          onClick={() => {
                            setCurrentPlant(plant._id);
                            setIsModalOpen(true);
                          }}
                        >
                          <h4 className="font-serif font-semibold text-2xl cursor-pointer">
                            {plant.commonName}
                          </h4>
                        </button>

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
