import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Loader from "../../components/Loader";

import { accountState } from "../../atoms/account";
import { toastMessageState } from "../../atoms/toastMessages";
import { userState } from "../../atoms/user";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [homeName, setHomeName] = useState("");
  const user = useRecoilValue(userState);
  const setAccount = useSetRecoilState(accountState);
  const setToastMessages = useSetRecoilState(toastMessageState);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const validate = () => {
    return name && homeName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validate()) {
      try {
        let res = await fetch(
          `http://${window.location.hostname}:5000/auth/account/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              name,
              homeName,
            }),
          }
        );
        let data = await res.json();
        if (res.ok) {
          setAccount(data);
          history.push("/");
        } else {
          setToastMessages((currentState) => [
            ...currentState,
            {
              title: "Error",
              message: err.error,
            },
          ]);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setToastMessages((currentState) => [
          ...currentState,
          {
            title: "Error",
            message: "Something went wrong. Please try again in a few minutes.",
          },
        ]);
      }
    } else {
      setIsLoading(false);
      setToastMessages((currentState) => [
        ...currentState,
        {
          title: "Missing Fields",
          message: "Please fill out the name and home name fields.",
        },
      ]);
    }
  };

  return (
    <>
      {user ? (
        <>
          <header className="w-full p-8 flex items-center justify-center text-gray-700 dark:text-gray-300">
            <div className="container pb-8 border-b border-gray-700 dark:border-gray-300">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-center">
                GreenLog
              </h1>
            </div>
          </header>
          <main className="w-full flex flex-col items-center space-y-8 px-4 text-black dark:text-white">
            <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">
              Introduce Yourself
            </h2>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md flex flex-col items-center space-y-4"
            >
              <fieldset className="focus-fieldset w-full">
                <label htmlFor="account-email">Email</label>
                <input
                  id="account-email"
                  name="account-email"
                  type="text"
                  className="input w-full bg-gray-300"
                  disabled
                  value={user.email}
                />
              </fieldset>
              <fieldset className="focus-fieldset w-full" disabled={isLoading}>
                <label htmlFor="account-name">Your Name</label>
                <input
                  id="account-name"
                  name="account-name"
                  type="text"
                  className="input w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </fieldset>
              <fieldset className="focus-fieldset w-full" disabled={isLoading}>
                <label htmlFor="account-home-name">Home Name</label>
                <input
                  id="account-home-name"
                  name="account-home-name"
                  type="text"
                  className="input w-full"
                  onChange={(e) => setHomeName(e.target.value)}
                />
              </fieldset>
              <fieldset className="w-full">
                <button type="submit" className="btn-primary w-full">
                  {isLoading ? (
                    <span className="py-1">
                      <Loader />
                    </span>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </fieldset>
            </form>
          </main>
        </>
      ) : (
        <Redirect to="/signin" />
      )}
    </>
  );
};

export default CreateAccount;
