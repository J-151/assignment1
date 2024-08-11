import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const SearchBar = ({ searchedValue, setSearchedValue }) => {
  const handleSearch = (e) => {
    setSearchedValue(e.target.value);
  };

  return (
    <div className="searchBar">
      <div className="searchDiv">
        <FaSearch className="searchIcon" />

        <input
          className="searchInput"
          value={searchedValue}
          onChange={(e) => handleSearch(e)}
          placeholder="Search"
        ></input>
        {searchedValue?.length > 0 && (
          <button
            className="searchButton"
            onClick={() => {
              setSearchedValue("");
            }}
          >
            <FaXmark />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
