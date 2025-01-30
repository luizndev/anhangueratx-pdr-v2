import { useState } from "react";
import { useNavigate } from "react-router-dom";

// IMPORTAÇÃO DE STYLE
import "./Navbar.css";

// IMPORTAÇÃO DE ICONS
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

const Navbar = ({ activePage }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const name = localStorage.getItem("username");
  const initial = name.charAt(0).toUpperCase();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <navbar>
      <div className="navbar-left">
        <img src="./Logotype.svg" alt="Logotipo" />
      </div>
      <div className="navbar-right">
        <ul>
          <li
            className={activePage === "inicio" ? "pageActive" : ""}
            onClick={() => handleNavigation("/inicio")}
          >
            Início
          </li>
          <li
            className={
              activePage === "realizar-solicitacoes" ? "pageActive" : ""
            }
            onClick={() => handleNavigation("/realizar-solicitacoes")}
          >
            Realizar Solicitações
          </li>
          {/* <li
            className={activePage === "feedback" ? "pageActive" : ""}
            onClick={() => handleNavigation("/feedback")}
          >
            FeedBack
          </li> */}
          <li
            className={activePage === "minhas-solicitacoes" ? "pageActive" : ""}
            onClick={() => handleNavigation("/minhas-solicitacoes")}
          >
            Minhas Solicitações
          </li>
        </ul>
        <button id="FQA">
          <AiOutlineQuestionCircle />
        </button>
        <div
          className="profile-container"
          onClick={toggleProfileMenu}
          title={name}
        >
          <div className="pdr-profile">{initial}</div>
          <MdOutlineKeyboardArrowDown />
          {showProfileMenu && (
            <div className="profile">
              {/* <button className="meu-perfil">
                <RiAccountCircle2Line />
                Meu Perfil
                
              </button> */}
              <ul className="mobile">
                <li
                  className={activePage === "inicio" ? "pageActive" : ""}
                  onClick={() => handleNavigation("/inicio")}
                >
                  Início
                </li>
                <li
                  className={
                    activePage === "realizar-solicitacoes" ? "pageActive" : ""
                  }
                  onClick={() => handleNavigation("/realizar-solicitacoes")}
                >
                  Realizar Solicitações
                </li>
                {/* <li
                  className={activePage === "feedback" ? "pageActive" : ""}
                  onClick={() => handleNavigation("/feedback")}
                >
                  FeedBack
                </li> */}
                <li
                  className={
                    activePage === "minhas-solicitacoes" ? "pageActive" : ""
                  }
                  onClick={() => handleNavigation("/minhas-solicitacoes")}
                >
                  Minhas Solicitações
                </li>
              </ul>
              <button className="logoff" onClick={handleLogout}>
                <IoMdLogOut />
                Logoff
              </button>
            </div>
          )}
        </div>
      </div>
    </navbar>
  );
};

export default Navbar;
