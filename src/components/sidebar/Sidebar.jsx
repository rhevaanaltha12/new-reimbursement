import React from "react";
import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
export default function Sidebar() {
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.setItem("user", null);
        alert("Logout Success");
        localStorage.getItem("user", null);
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="sidebar">
      <div className="top">
        <span>Dashboard</span>
      </div>
      <div className="center">
        <ul>
          <span className="title">Main</span>
          <NavLink
            to={"/"}
            style={{ textDecoration: "none" }}
            activeClassName="active"
          >
            <li>
              <HomeIcon className="icons" />
              <span className="text">Dashboard</span>
            </li>
          </NavLink>
          <span className="title">Action</span>
          <NavLink
            to={"/my-claims"}
            style={{ textDecoration: "none" }}
            activeClassName="active"
          >
            <li>
              <TableRowsIcon className="icons" />
              <span className="text">My Claims</span>
            </li>
          </NavLink>
          <NavLink
            to={"/make-claims"}
            style={{ textDecoration: "none" }}
            activeClassName="active"
          >
            <li>
              <DynamicFormIcon className="icons" />
              <span className="text">Make Claims</span>
            </li>
          </NavLink>
          <NavLink
            to={"/history"}
            style={{ textDecoration: "none" }}
            activeClassName="active"
          >
            <li>
              <HistoryIcon className="icons" />
              <span className="text">History</span>
            </li>
          </NavLink>
          <NavLink
            to={"/pending"}
            style={{ textDecoration: "none" }}
            activeClassName="active"
          >
            <li>
              <AutorenewIcon className="icons" />
              <span className="text">Pending</span>
            </li>
          </NavLink>
          <span className="title">User</span>
          <li>
            <AccountCircleIcon className="icons" />
            <span className="text">Profile</span>
          </li>
          <li>
            <LogoutIcon className="icons" />
            <span onClick={logoutHandler} className="text">
              Logout
            </span>
          </li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
}
