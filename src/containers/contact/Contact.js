import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigation/Router";
import { SearchBar } from "../home/searchBar/SearchBar";
import { SearchResultsList } from "../home/searchResultsList/SearchResultsList";
// import SearchResultsList from "../home/searchResultsList/SearchResultsList";
// import { SearchBar } from "../home/searchBar/SearchBar";

function Contact() {
  const navigate = useNavigate();
  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role == null) navigate(ROUTES.login.name);
  }, []);

  const [results, setResults] = useState([]);

  return (
    <div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {<SearchResultsList results={results} />}
      </div>
    </div>
  );
}

export default Contact;
