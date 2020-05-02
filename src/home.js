import React from "react";
import Card from "./card";
import Footer from "./footer";
import "./styles.css";

function Home() {
  return (
    <div className="relative max-w-7xl mx-auto">
      <img
        className="mt-3 max-w-md mx-auto sm:mt-4 pt-15 lg:pt-15 lg:pb-20"
        src="undraw_forming_ideas_0pav.svg"
        alt="R.I.P."
      />
      <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
        <Card />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
