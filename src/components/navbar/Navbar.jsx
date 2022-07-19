import React, { useContext } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="header-search">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="header-icon" />
        </div>
        <div className="header-items">
          <div className="header-item">
            <NotificationsIcon />
          </div>
          <div className="header-item">
            <img
              src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="gambar"
            />
            <p className="header-p">Hello {currentUser.email} !</p>
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
