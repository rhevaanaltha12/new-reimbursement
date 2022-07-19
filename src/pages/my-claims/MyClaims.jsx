import React from "react";
import ClaimsTable from "../../components/claim-table/ClaimsTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./myclaims.css";
export default function MyClaims() {
  return (
    <div className="myClaims">
      <Sidebar />
      <div className="container">
        <Navbar />
        <div className="containerItem">
          <ClaimsTable />
          {/* <Home type="myClaim" />
          <Home type="history" />
          <Home type="pending" />
          <Home type="success" /> */}
        </div>
      </div>
    </div>
  );
}
