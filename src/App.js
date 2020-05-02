import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home";
import Nav from "./nav";
import Publish from "./publish";
import "./styles.css";
import SearchPage from "./searchPage";

function App() {
  return (
    <Router>
      <div className="relative pt-8 pb-15 px-4 sm:px-6 lg:pt-10 lg:pb-15 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <Nav />
        </div>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/publish">
          <Publish />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
