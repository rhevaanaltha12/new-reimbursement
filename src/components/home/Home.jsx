import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import TocIcon from "@mui/icons-material/Toc";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { AuthContext } from "../../context/AuthContext";
export default function Home({ type }) {
  const [dataList, setDataList] = useState([]);
  const [pending, setPending] = useState([]);
  const [sucess, setSuccess] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      const q = query(
        collection(db, "reData"),
        where("name", "==", currentUser.email)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setDataList(list);
      console.log(list);
    };
    const fetchPending = async () => {
      let list = [];
      const q = query(
        collection(db, "reData"),
        where("name", "==", currentUser.email),
        where("status", "==", "Pending")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setPending(list);
      console.log(list);
    };
    const fetchSuccess = async () => {
      let list = [];
      const q = query(
        collection(db, "reData"),
        where("name", "==", currentUser.email),
        where("status", "==", "Approved")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setSuccess(list);
      console.log(list);
    };

    fetchData();
    fetchPending();
    fetchSuccess();
  }, []);

  let data;

  switch (type) {
    case "myClaim":
      data = {
        title: "MY CLAIMS",
        link: "See All My Claims",
        icon: <TocIcon className="icon" />,
        navlink: "/my-claims",
        total: `${dataList.length}`,
      };
      break;
    case "history":
      data = {
        title: "MY HISTORY",
        link: "See All My History",
        icon: (
          <HistoryIcon
            className="icon"
            style={{ color: "#FF447C", backgroundColor: "#ff447c3a" }}
          />
        ),
        total: `${dataList.length}`,
        navlink: "/my-claims",
      };
      break;
    case "pending":
      data = {
        title: "PENDING",
        link: "See All Pending",
        total: `${pending.length}`,
        navlink: "/pending",

        icon: (
          <AutorenewIcon
            className="icon"
            style={{ color: "#FF805D", backgroundColor: "#ff805d3b" }}
          />
        ),
      };
      break;
    case "success":
      data = {
        title: "SUCCESS",
        link: "See All Success",
        navlink: "/history",
        total: `${sucess.length}`,
        icon: (
          <CheckCircleIcon
            className="icon"
            style={{ color: "#4CB050", backgroundColor: "#10521222" }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="home">
      <div className="card">
        <div className="left">
          <div className="title">{data.title}</div>
          <div className="total">{data.total}</div>
          <Link style={{ textDecoration: "none" }} to={`${data.navlink}`}>
            <div className="link">{data.link}</div>
          </Link>
        </div>
        <div className="right">
          <div className="percentage">
            <KeyboardArrowUpIcon />
            20%
          </div>
          {/* <TocIcon className="icon" /> */}
          {data.icon}
        </div>
      </div>
    </div>
  );
}
