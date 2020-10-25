import React, { useState } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { Link, Router } from "@reach/router";
import Details from "./Components/Details";
import ThemeContext from "./Components/ThemeContext";

const App = () => {
  const themeHook = useState("firebrick");
  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <header>
          <Link to="/"> Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
