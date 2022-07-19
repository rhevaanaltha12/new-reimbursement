import React, { useContext } from "react";
import Chart from "../../components/chart/Chart";
import Home from "../../components/home/Home";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./dashboard.css";
export default function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="container">
        <Navbar />
        <div className="containerItem">
          <Home type="myClaim" />
          <Home type="history" />
          <Home type="pending" />
          <Home type="success" />
        </div>
        <div className="charts">
          {currentUser.email !== "admin@gmail.com" ? "" : <List />}
          <Chart />
        </div>
      </div>
    </div>
  );
}
