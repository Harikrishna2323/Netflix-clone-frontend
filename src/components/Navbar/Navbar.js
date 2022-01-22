import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState, useContext } from "react";
import "../Navbar/Navbar.scss";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/">
            <span style={{ color: "white" }}>Homepage</span>
          </Link>
          <Link to="/series">
            <span style={{ color: "white" }}>Series</span>
          </Link>
          <Link to="/movies">
            <span style={{ color: "white" }}>Movies</span>
          </Link>
          {/* <span>New and Popular</span>
          <span>My List</span> */}
        </div>
        <div className="right">
          <Search className="icon" />
          <span>Search</span>
          <Notifications className="icon" />
          <Link to="/profile">
            <img src={user.user.profilePic} alt="" />
          </Link>
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              {user.user.isAdmin && (
                <Link to="/admin/dashboard">
                  <span style={{ color: "white" }}>Dashboard</span>
                </Link>
              )}

              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "2px",
                }}
              >
                <span>Profile</span>
              </Link>

              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
