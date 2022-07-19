import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./list.css";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  where,
  addDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
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
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];

// const rows = [
//   {
//     id: 1,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Pending",
//   },
//   {
//     id: 2,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Pending",
//   },
//   {
//     id: 3,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Approved",
//   },
//   {
//     id: 4,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Approved",
//   },
//   {
//     id: 5,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Pending",
//   },
//   {
//     id: 6,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Pending",
//   },
//   {
//     id: 7,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Pending",
//   },
//   {
//     id: 8,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Approved",
//   },
//   {
//     id: 9,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Pending",
//   },
//   {
//     id: 10,
//     item: "ADSKJFBASK",
//     title: "Makan Pagi",
//     description: "Beli Makan Pagi",
//     jenisForm: "Makan",
//     subJenisForm: "Pagi",
//     jumlah: 56000,
//     keterangan: "Meminta Reimbursement Untuk Makan Pagi",
//     fileUpload: "asdsadsad",
//     total: 56000,
//     status: "Approved",
//   },
// ];

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "reData"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ ...doc.data(), id: doc.id });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    const unsub = onSnapshot(collection(db, "reData"), (snapShot) => {
      let list = [];
      try {
        snapShot.docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  console.log(data);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "reData", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (id) => {
    const updated = doc(db, "reData", id);
    try {
      await updateDoc(updated, {
        status: "Approved",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <div
              onClick={() => handleUpdate(params.row.id)}
              className="approveButton"
            >
              Appove
            </div>
            <div
              onClick={() => handleDelete(params.row.id)}
              className="deleteButton"
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <div className="title">All Claims</div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
