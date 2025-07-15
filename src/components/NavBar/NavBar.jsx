import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Navbar = ({
  token,
  setToken,
  userId,
  setUserId,
  userName,
  setUserName,
  setFavoritesTab,
}) => {
  const [button1Click, setButton1Click] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="global-navbar-box">
      <nav className="navbar-box container">
        <section className="global-burger-box">
          <div className="header-burger-box">
            <div
              className="navbar-button"
              onClick={() => {
                setIsBurgerOpen(!isBurgerOpen);
                setButton1Click(true);
                setTimeout(() => {
                  setButton1Click(false);
                }, 200);
              }}
            ></div>
            <p
              className={
                button1Click ? "menu-name-box clicked" : "menu-name-box"
              }
            >
              MENU
            </p>
          </div>
          <div
            className={
              isBurgerOpen
                ? "navbar-burger-box  open-burger"
                : "navbar-burger-box "
            }
          >
            <div
              className="characters-button"
              onClick={() => {
                navigate("/home");
                setIsBurgerOpen(!isBurgerOpen);
              }}
            >
              Personnages
            </div>
            <div
              className="comics-button"
              onClick={() => {
                navigate("/comics");
                setIsBurgerOpen(!isBurgerOpen);
              }}
            >
              Comics
            </div>
            <div
              className="favorites-button"
              onClick={() => {
                navigate("/favorites");
                setIsBurgerOpen(!isBurgerOpen);
              }}
            >
              Favoris
            </div>
          </div>
        </section>

        {location.pathname !== "/login" ? (
          token ? (
            <div
              className="signup-button"
              onClick={() => {
                Cookies.remove("marvelTok");
                setUserName("");
                setUserId(null);
                setToken(null);
                setFavoritesTab([]);
              }}
            >
              Se déconnecter{" "}
            </div>
          ) : (
            <div
              className="signup-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Connecte-toi | Enregistre-toi
            </div>
          )
        ) : (
          <div className="signup-button-disable"></div>
        )}
      </nav>
    </nav>
  );
};

export default Navbar;
