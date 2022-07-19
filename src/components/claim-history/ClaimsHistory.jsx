import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./claimshistory.css";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { AuthContext } from "../../context/AuthContext";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "item", headerName: "Item", width: 300 },
  { field: "name", headerName: "Nama", width: 300 },
  { field: "title", headerName: "Title", width: 350 },
  { field: "description", headerName: "Description", width: 350 },
  { field: "jenisForm", headerName: "Jenis", width: 130 },
  { field: "subJenisForm", headerName: "Sub Jenis", width: 130 },
  { field: "createdAt", headerName: "Created At", width: 150 },
  {
    field: "jumlah",
    headerName: "Jumlah",
    type: "number",
    width: 90,
  },
  { field: "keterangan", headerName: "Keterangan", width: 450 },
  { field: "fileUpload", headerName: "File Upload", width: 130 },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => {
      return (
        <div className={`cellStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export default function ClaimsHistory() {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
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
      setData(list);
      console.log(list);
    };

    fetchData();
  }, []);

  return (
    <div className="claimsHistory" style={{ width: "100%" }}>
      <div className="title">History</div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
