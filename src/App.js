import "./App.css";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UsersList from "./components/UsersList";

function App() {
  const [searchedValue, setSearchedValue] = useState("");

  return (
    <div className="App">
      <SearchBar
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
      />
      <UsersList searchedValue={searchedValue} />
    </div>
  );
}

export default App;
