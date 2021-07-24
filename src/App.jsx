import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ColorModePicker from "./components/ColorModePicker";
import PrivateRoute from "./components/PrivateRoute";
import Toast from "./components/Toast";

import CreateAccount from "./pages/auth/CreateAccount";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center">
        <ColorModePicker />
        <Toast />
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/createaccount">
            <CreateAccount />
          </Route>
          <PrivateRoute path="/plants">
            <Plants />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
        <footer className="justify-self-end mt-auto flex flex-col items-center self-end px-8 py-4 font-serif text-gray-700 dark:text-gray-300">
          <div className="container flex flex-col items-end">
            <p>&copy; DevSharpe.io 2021</p>
            <div className="flex items-center">
              <p>Having trouble?&nbsp;</p>
              <a
                href="mailto:undefined@email.com?subject=Help!%20GreenLog%20is%20in%20need%20of%20assistance."
                className="underline"
              >
                Let me know here.
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
