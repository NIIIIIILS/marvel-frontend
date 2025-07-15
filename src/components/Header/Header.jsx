import marvelLogo from "../../imgs/logo-marvel.png";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <img src={marvelLogo} alt="logoMarvel" />
        </Link>
        <div className="right-header">
          <Link to={"/characters"}>Personnages</Link>
          <Link to={"/comics"}>Comics</Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
