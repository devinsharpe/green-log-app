import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Transition } from "@headlessui/react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const clearCloseTimeout = () => {
    clearTimeout(closeTimeout);
    setCloseTimeout(null);
  };

  useEffect(() => {
    if (isOpen) {
      setCloseTimeout(setTimeout(() => setIsOpen(false), 5000));
    } else {
      clearCloseTimeout();
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="fixed z-20 top-10 left-10 h-8 w-8 bg-white dark:bg-gray-900 flex items-center justify-center rounded border text-black dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
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
      <Transition
        appear={true}
        show={isOpen}
        className="fixed top-4 left-4 z-30"
        enter="transition duration-150"
        enterFrom="opacity-0 -translate-x-32"
        enterTo="opacity-100"
        leave="transition duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 -translate-x-16"
      >
        <nav className="flex flex-col items-start space-y-2 bg-white dark:bg-gray-900 dark:text-white border border-gray-700 dark:border-gray-300 rounded shadow-lg p-4">
          <Link
            className="flex items-center justify-between space-x-2 w-full rounded hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2"
            to="/"
            onClick={clearCloseTimeout}
          >
            <span className="font-light w-24 text-left">Home</span>
            <svg
              width="20"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.939 14.766l-1.521 1.522-1.252-1.252a7.78 7.78 0 001.553-7.78 7.732 7.732 0 00-1.814-2.928 7.746 7.746 0 00-5.516-2.284c-.146 0-.287.033-.434.042-.045.005-.088-.005-.131.013a7.691 7.691 0 00-4.627 1.967L3.945 2.813l1.52-1.52a.41.41 0 10-.58-.579L3.076 2.523c-4.033 4.037-4.033 10.602 0 14.635a10.31 10.31 0 007.002 3.012c-.15.772-.68 2.449-2.471 2.449h-.512a.41.41 0 100 .817h6.594a.411.411 0 00.412-.409.411.411 0 00-.412-.408H9.718c.732-.702 1.07-1.7 1.188-2.46a10.294 10.294 0 006.801-3.001l1.812-1.812a.41.41 0 000-.579.408.408 0 00-.58-.001zm-8.549 2.053a6.93 6.93 0 004.934-2.045c1.922-1.92 2.457-4.686 1.663-7.107h-1.373a.413.413 0 01-.312-.144l-1.229-1.449c-.662-.182-1.432-.355-1.674-.355-.246.153-.637.359-.637.359a.417.417 0 01-.365.008L9.811 5.34a.44.44 0 01-.121-.089l-.775-.81a.413.413 0 01-.078-.455l.467-1.016a6.88 6.88 0 00-3.846 1.938c-.125.124-.211.265-.324.396h.832a.41.41 0 01.408.409V8.14c0 .135-.067.26-.174.336l-.664.463.031.679.525.363h1.002a.41.41 0 01.307.68l-1.408 1.654a.408.408 0 01-.554.068l-.949-.69-.725.222c.324 1.044.869 2.035 1.693 2.859a6.932 6.932 0 004.932 2.045zM4.618 4.648L3.395 3.423c-3.422 3.734-3.354 9.541.263 13.154 3.615 3.615 9.42 3.682 13.152.261l-1.223-1.223c-1.431 1.292-3.25 2.023-5.195 2.023a7.744 7.744 0 01-5.512-2.284c-2.693-2.692-2.988-6.875-.912-9.908.009-.009.013-.019.021-.027.188-.27.404-.521.629-.771z"
                fill="currentColor"
              />
              <path
                d="M12.23 10.844a.423.423 0 00-.41-.153.405.405 0 00-.312.303c-.068.268-.148.568-.221.811a17.863 17.863 0 00-1.232-.839l-1.518-.925a.406.406 0 00-.359-.029.41.41 0 00-.248.268l-.346 1.213-1.129 1.412a.416.416 0 00-.088.257v1.401c0 .188.127.353.309.397l2.094.517h3.135c.08 0 .158-.025.225-.068l1.295-.848a.414.414 0 00.182-.343v-1.425a.415.415 0 00-.08-.248l-1.297-1.701zM16.191 7.877h-1.518a.41.41 0 00-.41.41V9.84a.41.41 0 00.525.393l1.518-.441a.411.411 0 00.295-.395v-1.11a.41.41 0 00-.41-.41z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link
            className="flex items-center justify-between space-x-2 w-full rounded hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2"
            to="/plants"
            onClick={clearCloseTimeout}
          >
            <span className="font-light w-24 text-left">PlantPedia</span>
            <svg
              width="16"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.381 19.377a.41.41 0 00.41-.41l-.002-.037V1.32a.41.41 0 00-.41-.41H2.914A2.607 2.607 0 00.31 3.514v17.634a2.606 2.606 0 002.604 2.604h12.467a.41.41 0 000-.819 1.784 1.784 0 01-1.781-1.78c.001-.979.8-1.776 1.781-1.776zm-1.893 3.557H2.914a1.786 1.786 0 01-1.784-1.785c0-.984.8-1.785 1.784-1.785H13.5a2.59 2.59 0 00-.012 3.57zM3.324 18.545V1.73H14.97v16.814H3.324v.001z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link
            className="flex items-center justify-between space-x-2 w-full rounded hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2"
            onClick={clearCloseTimeout}
          >
            <span className="font-light w-24 text-left">Account</span>
            <svg
              width="34"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.633 2.289c-.002 0-.002-.002-.002-.002-.531-.523-1.021-.908-1.545-1.211-.521-.301-1.1-.533-1.82-.734-2.852-.783-6.004.225-7.914 2.453a5.909 5.909 0 00-6.293.004c-.145-.172-.277-.354-.439-.512h-.002v-.002c-.533-.521-1.021-.906-1.545-1.209-.521-.301-1.1-.533-1.82-.734a7.742 7.742 0 00-8.759 3.571C-.26 6.95.269 10.804 2.781 13.28c.002 0 .002.002.002.002.529.521 1.021.906 1.549 1.211a7.804 7.804 0 001.814.734c.67.182 1.359.277 2.051.277 2.43 0 4.746-1.162 6.26-3.193a6.16 6.16 0 00.449-.656c.188-.322.348-.656.482-.998.045-.115.074-.234.115-.352.078-.229.156-.455.211-.686.037-.143.053-.291.078-.436.041-.211.08-.418.1-.631.016-.154.014-.311.021-.467.006-.201.014-.402.006-.607-.008-.158-.029-.318-.047-.48-.021-.195-.041-.391-.078-.584-.029-.164-.072-.324-.113-.486-.049-.186-.096-.373-.16-.559-.051-.16-.115-.316-.18-.475a7.054 7.054 0 00-.488-.986c-.053-.088-.092-.182-.146-.268a4.814 4.814 0 014.984-.016 4.22 4.22 0 00-.182.287 7.665 7.665 0 00-.828 2.1 7.741 7.741 0 001.346 6.379 7.571 7.571 0 00.77.891c.529.521 1.021.906 1.549 1.211a7.821 7.821 0 001.816.734 7.74 7.74 0 008.759-3.573c1.753-3.036 1.224-6.89-1.288-9.364zM2.424 4.451a6.663 6.663 0 016.852-3.224L3.061 11.995a6.651 6.651 0 01-.637-7.544zM3.838 12.8l6.523-11.303c.449.145.828.311 1.17.512.346.197.68.443 1.027.758L6.035 14.07a6.371 6.371 0 01-1.17-.512 6.125 6.125 0 01-1.027-.758zm10.137-1.683c-.07.117-.15.234-.242.361-.061.084-.125.17-.205.275v.002c-1.461 1.959-3.988 2.988-6.404 2.582l6.211-10.76c.064.08.127.162.189.244a6.642 6.642 0 01.451 7.296zm12.24-9.977c.359 0 .719.029 1.074.088L21.076 11.99c-.062-.08-.125-.16-.186-.242a6.641 6.641 0 01-.451-7.299c.107-.186.232-.352.355-.518l.088-.115a6.677 6.677 0 015.333-2.676zM21.852 12.8l6.523-11.303c.451.145.828.311 1.172.512.344.197.678.443 1.027.758L24.051 14.07a6.282 6.282 0 01-1.17-.512 5.978 5.978 0 01-1.029-.758zm10.136-1.683c-1.359 2.357-4.145 3.668-6.852 3.221l1.961-3.396 4.254-7.369a6.651 6.651 0 01.637 7.544z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <button
            className="btn-secondary w-full"
            onClick={() => setIsOpen(false)}
          >
            <span className="leading-none text-xl">&times;</span>
            <span className="font-light">Close</span>
          </button>
        </nav>
      </Transition>
    </>
  );
};

export default Navigation;
