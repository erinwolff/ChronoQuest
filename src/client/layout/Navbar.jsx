import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";
import clockLogo from "../assets/clock.gif"
import homeIcon from "../assets/home.png"
import loginIcon from "../assets/login.png"
import logoutIcon from "../assets/logout.png"
import profileIcon from "../assets/user.png"

import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="top">
      <img className="clockLogo" src={clockLogo} /><h1>ChronoQuest</h1>
      <menu>
        {token ? (
          <>
            <div className="navIconsContainer">
              <NavLink to="/home"><img className="navIcons" src={homeIcon} /></NavLink>
              <p>Home</p>
            </div>
            <div className="navIconsContainer">
              <NavLink to="/profile"><img className="navIcons" src={profileIcon} /></NavLink>
              <p>Profile</p>
            </div>
            <div className="navIconsContainer">
              <a onClick={handleLogout}><img className="navIcons" src={logoutIcon} /></a>
              <p>Logout</p>
            </div>
          </>
        ) : (
          <>
            <div className="navIconsContainer">
              <NavLink to="/home"><img className="navIcons" src={homeIcon} /></NavLink>
              <p>Home</p>
            </div>
            <div className="navIconsContainer">
              <NavLink to="/login"><img className="navIcons" src={loginIcon} /></NavLink>
              <p>Login</p>
            </div>
          </>
        )}
      </menu>
    </nav>
  );
}
