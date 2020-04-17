import React, { Fragment } from "react";
import Search from "./search";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Nav() {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <Link to="/">
          <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Higan Bana
          </h2>
        </Link>
      </div>

      <div class="mt-4 flex md:mt-0 md:ml-4">
        <Search />
        <span class="ml-3 shadow-sm rounded-md">
          <Link to="/publish">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Publish
            </button>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Nav;
