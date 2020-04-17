import React, { Fragment } from "react";
import Card from "./card";
import Search from "./search";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative max-w-7xl mx-auto">
        <img
          className="mt-3 max-w-md mx-auto sm:mt-4 pt-15 lg:pt-15 lg:pb-20"
          src="undraw_forming_ideas_0pav.svg"
        />
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <Card />
        </div>
      </div>
  );
}

export default Home;
