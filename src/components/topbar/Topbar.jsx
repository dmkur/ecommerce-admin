import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { authActions } from "../../redux/slices/auth.slice";

const Topbar = () => {
  const { currentUser } = useSelector((state) => state.authReducer);
  const [popUp, setPopUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logOut = () => {
    dispatch(authActions.logout());
    setPopUp(!popUp);
    navigate('/login')
  };

  const PopUpMenu = () => {
    return (
      <div>
        <ul className="drop-down">
          <li>
            <Link to={"/login"}>sing in</Link>
          </li>
          <li onClick={() => logOut()}>log out</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={"/"}>
            <span className="logo">DM.admin</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer" onClick={() => setPopUp(!popUp)}>
            <Settings />
          </div>
          {popUp && PopUpMenu()}
          <div className="topbarIconContainer">
            <Link to={"/login"}>{currentUser ? "" : "sign in"}</Link>
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};
export { Topbar };
