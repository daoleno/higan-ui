import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Search() {
  let history = useHistory();
  const [searchItem, setSearchItem] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();

    setSearchItem(e.target.value);

    if (e.key === "Enter") {
      history.push({
        pathname: "/search",
        search: "?q=" + searchItem,
        searchItem: searchItem,
      });
    }
  };
  return (
    <div className="w-full flex md:ml-0">
      <label className="sr-only">Search</label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
        </div>
        <input
          id="search_field"
          className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
          placeholder="Search"
          type="search"
          onKeyUp={handleSearch}
        />
      </div>
    </div>
  );
}

export default Search;
