import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ROUTES from "../../../navigation/Router";
import { useDispatch, useSelector } from "react-redux";
import { savedata } from '../../../features/SearchData/searchSlice'

export const SearchBar = ({ setResults }) => {

  const count = useSelector((state) => state.searchData.value)
  const dispatch = useDispatch()
  const [input, setInput] = useState([]);

  const fetchData = (value) => {
    fetch("https://localhost:7199/api/Product")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.title &&
            user.title.toLowerCase().includes(value)
          );
        });
        setResults(results);
        dispatch(savedata(results) || []);
        setInput(results);
      });
  };


  const handleChange = (value) => {
    fetchData(value);
  };

  return (
    <div className="header__search">
      <input
        className="rounded-textbox"
        type="text"
        placeholder="Search Amazon.in"
        onChange={(e) => handleChange(e.target.value)}
      />
      <Link to={ROUTES.SearchResult.name}>
        <SearchIcon className="header__searchIcon" />
      </Link>
      {/* logo */}
    </div>
  );
};
