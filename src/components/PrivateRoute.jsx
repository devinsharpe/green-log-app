import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilState } from "recoil";

import Loader from "./Loader";

import { accountState } from "../atoms/account";
import { userState } from "../atoms/user";

const PrivateRoute = ({ children, ...rest }) => {
  const [account, setAccount] = useRecoilState(accountState);
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccounted, setIsAccounted] = useState(false);

  useEffect(async () => {
    if (localStorage.getItem("greenlog-token")) {
      try {
        let res = await fetch(
          `http://${window.location.hostname}:5000/auth/user/`,
          {
            headers: {
              Authorization: localStorage.getItem("greenlog-token"),
            },
          }
        );
        let data = await res.json();
        if (res.ok) {
          setUser({
            ...data.user,
            token: localStorage.getItem("greenlog-token"),
          });
          setAccount(data.account);
          setIsAuthenticated(Boolean(data.user));
          setIsAccounted(Boolean(data.account));
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsAccounted(Boolean(account));
        setIsAuthenticated(Boolean(user));
        setIsLoading(false);
      }
    } else {
      setIsAccounted(Boolean(account));
      setIsAuthenticated(Boolean(user));
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  } else if (isAuthenticated && isAccounted) {
    return <Route {...rest} render={({}) => children} />;
  } else if (isAuthenticated) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/createaccount",
              state: { from: location },
            }}
          />
        )}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  // if (user !== null && account === null) {
  //   return (
  //     <Route
  //       {...rest}
  //       render={({ location }) => (
  //         <Redirect
  //           to={{
  //             pathname: "/createaccount",
  //             state: { from: location },
  //           }}
  //         />
  //       )}
  //     />
  //   );
  // } else if (user === null) {
  //   return (
  //     <Route
  //       {...rest}
  //       render={({ location }) => (
  //         <Redirect
  //           to={{
  //             pathname: "/signin",
  //             state: { from: location },
  //           }}
  //         />
  //       )}
  //     />
  //   );
  // } else {
  //   return <Route {...rest} render={({}) => children} />;
  // }
};

export default PrivateRoute;
