import React from "react";
import Card from "./card";
import Search from "./search";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Publish from './publish';
import Home from "./home";
import Nav from './nav'

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
        </Switch>
    </Router>
  );
}

export default App;
