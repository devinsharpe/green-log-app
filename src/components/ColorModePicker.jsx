import React, { useEffect, useState } from "react";

const ColorModePicker = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme === undefined || storedTheme === null) {
      localStorage.setItem("theme", "system");
      setTheme("system");
    } else {
      setTheme(storedTheme);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (localStorage.getItem("theme") === "system") {
          e.matches
            ? window.document.documentElement.classList.add("dark")
            : window.document.documentElement.classList.remove("dark");
        }
      });
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      window.document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      window.document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? window.document.documentElement.classList.add("dark")
        : window.document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else if (theme === "system") {
      setTheme("light");
    }
  };

  return (
    <button
      type="button"
      className="fixed top-10 right-10 h-8 w-8 bg-white dark:bg-gray-900 flex items-center justify-center rounded border text-gray-700 dark:text-gray-300"
      onClick={changeTheme}
    >
      {theme === "light" && (
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
      )}
      {theme === "dark" && (
        <svg
          width="14"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.82.329A6.543 6.543 0 00.285 6.865c0 2.01.916 3.87 2.516 5.127a.427.427 0 00.107.105c.01.005.855.576.855 1.668 0 .019.016.028.018.048.002.013-.012.026-.008.042l1.072 4.898a.409.409 0 00.4.322h3.15a.41.41 0 00.398-.322l1.076-4.898c.004-.016-.012-.029-.01-.042.002-.02.02-.029.02-.048 0-1.077.82-1.644.854-1.668a.294.294 0 00.088-.091c1.615-1.256 2.539-3.126 2.539-5.142.001-3.603-2.934-6.535-6.54-6.535zm1.246 17.928h-2.49l-.09-.404h2.666l-.086.404zm.268-1.224H5.309l-.09-.407h3.205l-.09.407zm.27-1.224H5.04l-.357-1.632h4.281l-.36 1.632zm1.644-4.395a.371.371 0 00-.086.091c-.275.22-.928.841-1.072 1.852H7.235V7.639a.8.8 0 01.234-.574.805.805 0 01.578-.241c.225 0 .41-.185.41-.409a.41.41 0 00-.41-.409c-.439 0-.85.171-1.158.481-.027.029-.039.068-.066.101-.027-.033-.041-.074-.07-.105a1.622 1.622 0 00-1.15-.477h-.006a.41.41 0 00.002.818h.004a.815.815 0 01.812.818v5.715H4.554c-.145-1.015-.801-1.635-1.072-1.855a.408.408 0 00-.086-.085c-1.457-1.1-2.289-2.76-2.289-4.551a5.722 5.722 0 015.715-5.718 5.726 5.726 0 015.721 5.718c-.002 1.79-.838 3.449-2.295 4.548z"
            fill="currentColor"
          />
        </svg>
      )}
      {theme === "system" && (
        <svg
          width="23"
          height="17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.525 14.429h-.973V1.075a.409.409 0 00-.408-.409H1.876a.412.412 0 00-.41.409v13.354H.5a.41.41 0 00-.41.408c0 .986.803 1.786 1.787 1.786h19.275a1.788 1.788 0 001.781-1.786.408.408 0 00-.408-.408zM2.287 1.484h18.447v12.944H2.287V1.484zm9.227 14.321a.962.962 0 01-.867-.558h1.734a.956.956 0 01-.867.558zm-10.51-.558h8.807c.053.204.127.389.242.558H1.877a.964.964 0 01-.873-.558zm20.146.558v.411l-.006-.411h-8.168c.113-.169.191-.354.24-.558h8.807a.974.974 0 01-.873.558z"
            fill="currentColor"
          />
          <path
            d="M20.184 13.461V2.451a.408.408 0 00-.41-.409H3.254a.411.411 0 00-.41.409v11.01c0 .227.186.41.41.41h16.52c.228 0 .41-.183.41-.41zm-.821-.408H3.664V2.862h15.699v10.191z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
};

export default ColorModePicker;
