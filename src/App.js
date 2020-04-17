import React from "react";
import Record from "./record";
import "./styles.css";

function App() {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="absolute inset-0">
      <div className="bg-white h-1/3 sm:h-2/3"></div>
    </div>
    <div className="relative max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
          Higan Bana
        </h2>
        <img className="mt-3 max-w-md mx-auto sm:mt-4" src="undraw_forming_ideas_0pav.svg" />
      </div>
      <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
        <Record />
      </div>
      

    </div>
  </div>
  );
}

export default App;
