import React from "react";
import ClaimsHistory from "../../components/claim-history/ClaimsHistory";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./history.css";
export default function History() {
  return (
    <div className="history">
      <Sidebar />
      <div className="container">
        <Navbar />
        <div className="containerItem">
          <ClaimsHistory />
        </div>
      </div>
    </div>
  );
}
