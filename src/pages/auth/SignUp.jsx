import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Loader from "../../components/Loader";

import { toastMessageState } from "../../atoms/toastMessages";
import { userState } from "../../atoms/user";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setToastMessages = useSetRecoilState(toastMessageState);
  const setUser = useSetRecoilState(userState);
  const history = useHistory();

  const validate = () => {
    return email && password && confirm && password == confirm;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validate()) {
      try {
        let res = await fetch(
          `http://${window.location.hostname}:5000/auth/signup/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              passwordConfirm: confirm,
            }),
          }
        );
        let data = await res.json();
        if (res.ok) {
          setUser({ ...user, token: data.token });
          localStorage.setItem("greenlog-token", data.token);
          history.push("/createaccount");
        } else {
          setToastMessages((current) => [
            ...current,
            {
              title: "Error",
              message: data.error,
            },
          ]);
        }
      } catch (err) {
        console.log(err);
        setToastMessages((current) => [
          ...current,
          {
            title: "Error",
            message: "Something went wrong. Please try again in a few minutes.",
          },
        ]);
      }
    } else {
      setToastMessages((current) => [
        ...current,
        {
          title: "Missing Fields",
          message:
            "Please fill out the email and password fields. Don't forget the confirm password field either.",
        },
      ]);
    }
    setIsLoading(false);
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
          Get Started
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
          <fieldset className="focus-fieldset w-full">
            <label htmlFor="password-confirm">confirm password</label>
            <input
              id="password-confirm"
              name="password-confirm"
              type="password"
              className="input w-full"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </fieldset>
          <fieldset className="w-full space-y-4">
            <button type="submit" className="btn-primary w-full">
              {isLoading ? (
                <span className="py-1">
                  <Loader />
                </span>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 font-serif text-lg">
              <p>Already have an account?&nbsp;</p>
              <Link to="/signin/" className="underline">
                Sign in here!
              </Link>
            </div>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default SignUp;
