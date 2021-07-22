import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Loader from "../../components/Loader";

import { accountState } from "../../atoms/account";
import { toastMessageState } from "../../atoms/toastMessages";
import { userState } from "../../atoms/user";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAccount = useSetRecoilState(accountState);
  const setToastMessages = useSetRecoilState(toastMessageState);
  const setUser = useSetRecoilState(userState);
  const history = useHistory();

  const validate = () => {
    return email && password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validate()) {
      try {
        let res = await fetch(
          `http://${window.location.hostname}:5000/auth/login/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        if (res.ok) {
          let data = await res.json();
          setUser({ ...data.user, token: data.token });
          localStorage.setItem("greenlog-token", data.token);
          if (data.account) {
            setAccount(data.account);
            history.push("/");
          } else {
            history.push("/createaccount");
          }
        } else {
          setToastMessages((current) => [
            ...current,
            {
              title: "Error",
              message:
                "There doesn't seem to be a user with that email and password.",
            },
          ]);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setToastMessages((current) => [
          ...current,
          {
            title: "Error",
            message: "This wasn't expected. Please try again.",
          },
        ]);
        setIsLoading(false);
      }
    } else {
      setToastMessages((currentState) => [
        ...currentState,
        {
          title: "Missing Fields",
          message: "Please fill out the email and password fields.",
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
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
          Welcome Home
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center space-y-4"
        >
          <fieldset className="focus-fieldset w-full">
            <label htmlFor="email-address">email</label>
            <input
              id="email-address"
              name="email-address"
              type="text"
              className="input w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="focus-fieldset w-full">
            <label htmlFor="password">password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="input w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <fieldset className="w-full space-y-4">
            <button type="submit" className="btn-primary w-full">
              {isLoading ? (
                <span className="py-1">
                  <Loader />
                </span>
              ) : (
                <span>Sign In</span>
              )}
            </button>
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 font-serif text-lg">
              <p>Need an account?&nbsp;</p>
              <Link to="/signup/" className="underline">
                Sign up here!
              </Link>
            </div>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default SignIn;
