import React from "react";

const PlantListItem = () => {
  return (
    <div className="max-h-32 group w-full bg-gray-100 dark:bg-gray-800 border border-transparent hover:border-gray-300 transition-colors duration-150 rounded overflow-hidden flex ">
      <img
        src="https://images.unsplash.com/photo-1611211233356-81aca9d2c182?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
        alt=""
        className="h-32 wa-auto cursor-pointer"
      />
      <div className="flex w-full justify-between space-x-2">
        <div className="space-y-2 pl-4 py-2 w-full">
          <h4 className="font-serif font-semibold text-2xl group-hover:underline cursor-pointer">
            Snakie
          </h4>
          <h5 className="opacity-50">Dracaena trifasciata</h5>
        </div>
        <div className="p-4 text-gray-600 grid grid-rows-2 grid-flow-col gap-2">
          <button className="w-10 h-10 flex items-center justify-center space-x-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
            <svg
              width="17"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.483 0L2.144 10.668C0 14-.715 18.178 2.143 21.037a7.268 7.268 0 005.174 2.145h2.332c1.352 0 3.793-.762 5.175-2.145 2.857-2.859 2.142-7.037-.003-10.369L8.483 0zm0 1.248L2.74 11.229C1 14.5.184 17.918 2.723 20.457a6.452 6.452 0 004.594 1.904H9.65c1.351 0 3.367-.676 4.594-1.904 2.539-2.539 1.722-5.957-.02-9.228l-5.74-9.981z"
                fill="currentColor"
              />
              <path
                d="M12 18.471C11 19.444 9 20 9 20s1.5-1 2.5-2 1.5-3 1.5-3c0 1.632 0 2.5-1 3.471z"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
            <svg
              width="24"
              height="25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5.913a6.545 6.545 0 00-6.537 6.538c0 2.005.914 3.863 2.512 5.121.029.043.066.08.111.11.01.007.857.577.857 1.67 0 .017.018.027.018.045.002.015-.012.027-.008.042l1.072 4.9a.408.408 0 00.4.32h3.15a.412.412 0 00.4-.32l1.074-4.9c.004-.015-.012-.027-.01-.042.002-.018.02-.028.02-.045 0-1.078.82-1.647.854-1.67a.374.374 0 00.09-.091c1.611-1.258 2.533-3.126 2.533-5.141A6.543 6.543 0 0012 5.913zm1.246 17.929h-2.49l-.088-.403h2.666l-.088.403zm.268-1.224h-3.025l-.09-.406h3.205l-.09.406zm.269-1.226h-3.564l-.355-1.63h4.279l-.36 1.63zm1.647-4.391a.355.355 0 00-.088.089c-.273.221-.926.84-1.072 1.853h-1.859v-5.717c0-.449.367-.816.816-.816.225 0 .41-.184.41-.41a.412.412 0 00-.41-.41c-.496 0-.926.234-1.227.583-.029-.034-.039-.075-.072-.106a1.61 1.61 0 00-1.146-.477h-.006a.41.41 0 00.002.82h.004c.213 0 .416.083.57.237a.81.81 0 01.24.579v5.717H9.735c-.145-1.008-.793-1.626-1.07-1.851a.426.426 0 00-.09-.09c-1.457-1.102-2.291-2.76-2.291-4.551a5.724 5.724 0 015.717-5.718 5.724 5.724 0 015.719 5.718c-.001 1.79-.837 3.447-2.29 4.55zM12.145 4.315c.225 0 .41-.184.41-.41V1.153a.408.408 0 10-.818 0v2.754a.407.407 0 00.408.409zM6.014 6.614a.41.41 0 00.58-.58L4.649 4.088a.409.409 0 00-.58 0 .414.414 0 000 .58l1.945 1.946zM4.297 12.164a.41.41 0 00-.408-.41H1.131a.41.41 0 000 .82h2.758a.41.41 0 00.408-.41zM6.02 17.712L4.069 19.66a.411.411 0 00.58.58l1.949-1.948a.41.41 0 00-.578-.58zM18.271 18.063a.414.414 0 00-.58 0 .407.407 0 000 .58l1.945 1.95a.411.411 0 00.58 0 .41.41 0 000-.578l-1.945-1.952zM23.154 11.754l-2.754-.003a.409.409 0 100 .818l2.754.005a.41.41 0 100-.82zM17.98 6.733c.104 0 .209-.04.291-.121l1.949-1.945a.41.41 0 00-.58-.58l-1.949 1.946a.406.406 0 000 .579.402.402 0 00.289.12z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center space-x-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
            <svg
              width="27"
              viewBox="0 0 32 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.326 8.509h-2.359l1.312-.205a1.688 1.688 0 001.367-1.96 1.68 1.68 0 00-1.967-1.365l-4.854.955 4.342-2.395c.393-.225.67-.59.787-1.027a1.673 1.673 0 00-.17-1.283c-.445-.773-1.5-1.082-2.316-.613L15.689 7.729l-3.965.779-10.641.002a.562.562 0 00-.561.562c0 .838.078 1.705.232 2.561a.6.6 0 00.039.27c.316 1.742.924 3.4 1.785 4.91l.025.066a.888.888 0 00.084.123c2.816 4.783 7.988 7.752 13.518 7.752 8.646 0 15.682-7.035 15.682-15.684a.56.56 0 00-.561-.561zm-3.285-6.922a.57.57 0 01.771.203.587.587 0 01.057.432.579.579 0 01-.254.34l-7.412 4.084-2.283.449 9.121-5.508zm1.943 4.489a.56.56 0 01.555.465.56.56 0 01-.445.654l-8.42 1.314h-4.111l12.421-2.433zM16.207 23.63c-5.143 0-9.953-2.768-12.6-7.281l-.012-.027a14.492 14.492 0 01-1.709-4.691c-.002-.008-.002-.012-.002-.018a1.665 1.665 0 00-.006-.049 15.658 15.658 0 01-.219-1.93l29.09.002c-.294 7.766-6.706 13.994-14.542 13.994z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 9 33"
              height="24"
            >
              <path
                d="M6.295 3.181C4.963 1.792 3.193 1.066 1.03 1.017a.585.585 0 00-.695.227.563.563 0 00-.11.334l.028 22.93v6.145a1.691 1.691 0 003.38 0v-5.584h4.742a.56.56 0 00.562-.561V11.005c.009-.199.148-4.923-2.643-7.824zM2.508 30.652a.564.564 0 01-.562.564.57.57 0 01-.568-.564v-5.584h1.13v5.584zm5.306-19.666v12.957H1.376V2.158c1.682.111 3.06.717 4.104 1.799 2.459 2.552 2.336 6.964 2.334 7.029z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantListItem;
