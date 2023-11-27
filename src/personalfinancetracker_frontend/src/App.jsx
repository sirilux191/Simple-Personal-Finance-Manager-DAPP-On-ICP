import React from "react";
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import GetData from "./pages/GetData";
import Home from "./pages/Home";
import AddEntry from "./pages/AddEntry";
import AddIncomePage from "./pages/AddIncomePage";
import AddExpensePage from "./pages/AddExpensePage";
import "./App.css";
//Difference 1
//Connect2IC
import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
} from "@connect2ic/react";
import "./connect2ic.css";
//
import * as personalfinancetracker_backend from "../../declarations/personalfinancetracker_backend";
//
//Difference 1

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/getdata":
        title = "";
        metaDescription = "";
        break;
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/add-entry":
        title = "";
        metaDescription = "";
        break;
      case "/addincomepage":
        title = "";
        metaDescription = "";
        break;
      case "/addexpensepage":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Difference 2 */}
      <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog />
      {/* Difference 2 */}
      <Routes>
        <Route
          path="/getdata"
          element={<GetData />}
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/add-entry"
          element={<AddEntry />}
        />
        <Route
          path="/addincomepage"
          element={<AddIncomePage />}
        />
        <Route
          path="/addexpensepage"
          element={<AddExpensePage />}
        />
      </Routes>
    </>
  );
}
// Difference 3
const client = createClient({
  canisters: {
    personalfinancetracker_backend,
  },
  providers: defaultProviders,
});
// Difference 3
// Difference 4
export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
// Difference 4
