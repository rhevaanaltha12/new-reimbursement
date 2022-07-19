import React from "react";
import ClaimsForm from "../../components/claim-form/ClaimsForm";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./makeclaims.css";
export default function MakeClaims() {
  return (
    <div className="makeClaims">
      <Sidebar />
      <div className="container">
        <Navbar />
        <div className="containerItem">
          <ClaimsForm />
        </div>
      </div>
    </div>
  );
}
