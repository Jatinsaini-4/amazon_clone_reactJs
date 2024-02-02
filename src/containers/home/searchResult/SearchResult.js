import { useNavigate } from "react-router-dom";
import "./SearchResult.css";
import ROUTES from "../../../navigation/Router";

export const SearchResult = ({ result }) => {
  const navigate = useNavigate();
  return (
    <div
      className="search-result"
      onClick={(e) => {
        navigate(ROUTES.detail.name + "?id=" + result.id);
      }}
    >
      {result.title}
    </div>
  );
};
