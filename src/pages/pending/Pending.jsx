import React from "react";
import ClaimsPending from "../../components/claim-pending/ClaimsPending";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./pending.css";
export default function Pending() {
  return (
    <div className="pending">
      <Sidebar />
      <div className="container">
        <Navbar />
        <div className="containerItem">
          <ClaimsPending />
        </div>
      </div>
    </div>
  );
}
