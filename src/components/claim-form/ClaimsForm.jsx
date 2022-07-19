import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import "./claimsform.css";
import { nanoid } from "nanoid";
import { jenis, subJenis } from "../../utils/jenis";
import { MenuItem } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
export default function ClaimsForm() {
  const { currentUser } = useContext(AuthContext);
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + "-" + time;
  const navigate = useNavigate();

  //Use State Form
  const [item, setItem] = useState(`RM-${nanoid(15)}-${dateTime}`);
  const [name, setName] = useState(currentUser.email);
  const [createdAt, setCreatedAt] = useState(dateTime);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jenisForm, setJenisForm] = useState("");
  const [subJenisForm, setSubJenisForm] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("Pending");

  //HandlerForm
  const itemHandler = (e) => {
    setItem(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const createdAtHandler = (e) => {
    setCreatedAt(e.target.value);
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const descHandler = (e) => {
    setDescription(e.target.value);
  };
  const jenisHandler = (e) => {
    setJenisForm(e.target.value);
  };
  const subJenisHandler = (e) => {
    setSubJenisForm(e.target.value);
  };
  const jumlahHandler = (e) => {
    setJumlah(e.target.value);
  };
  const keteranganHandler = (e) => {
    setKeterangan(e.target.value);
  };
  const fileHandler = (e) => {
    setFileUpload(e.target.value);
  };
  const totalHandler = (e) => {
    setTotal(jumlah);
  };

  //   Submit

  const submitHandler = async (e) => {
    e.preventDefault();
    // const reData = {
    //   item: item,
    //   name: name,
    //   title: title,
    //   description: description,
    //   jenisForm: jenisForm,
    //   subJenisForm: subJenisForm,
    //   jumlah: jumlah,
    //   keterangan: keterangan,
    //   fileUpload: fileUpload,
    //   total: total,
    //   status: status,
    // };

    try {
      const res = await addDoc(collection(db, "reData"), {
        item: item,
        timestamp: serverTimestamp(),
        name: name,
        createdAt: createdAt,
        title: title,
        description: description,
        jenisForm: jenisForm,
        subJenisForm: subJenisForm,
        jumlah: jumlah,
        keterangan: keterangan,
        fileUpload: fileUpload,
        total: total,
        status: status,
      });
      console.log(res);
      alert("Data Berhasil di Upload");
      navigate("/my-claims");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="claimsForm">
      <div className="title">Make Claims</div>
      <Box
        onSubmit={submitHandler}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Item ID"
            // defaultValue="Hello World"
            onChange={itemHandler}
            value={item}
          />
          <TextField
            disabled
            id="outlined-required"
            label="Name"
            value={name}
            onChange={nameHandler}
            // defaultValue="Hello World"
          />
          <TextField
            disabled
            id="outlined-required"
            label="Created At"
            value={createdAt}
            onChange={createdAtHandler}
            // defaultValue="Hello World"
          />
          <TextField
            required
            id="outlined-required"
            type="text"
            label="Title"
            onChange={titleHandler}
            // defaultValue="Hello World"
          />
          <TextField
            required
            id="outlined-required"
            type="text"
            label="Description"
            onChange={descHandler}
            rows={4}
            multiline
            // defaultValue="Hello World"
          />
        </div>
        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="Jenis"
            helperText="Pilih Jenis Kategori"
            onChange={jenisHandler}
            style={{ width: "40ch" }}
          >
            {jenis.map((value, no) => (
              <MenuItem key={no} value={value.jenis}>
                {value.jenis}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Sub Jenis"
            onChange={subJenisHandler}
            helperText="Pilih Sub Jenis Kategori"
            style={{ width: "40ch" }}
          >
            {subJenis.map((value, no) => (
              <MenuItem key={no} value={value.item}>
                {value.item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="outlined-required"
            type="number"
            label="Jumlah"
            onChange={jumlahHandler}
            style={{ width: "40ch" }}
            helperText="Masukkan Jumlah"
            // defaultValue="Hello World"
          />
          <TextField
            required
            id="outlined-required"
            type="text"
            label="Keterangan"
            onChange={keteranganHandler}
            rows={4}
            helperText="Masukkan Keterangan"
            style={{ width: "46%" }}
            multiline
            // defaultValue="Hello World"
          />
          <TextField
            required
            id="outlined-required"
            onChange={fileHandler}
            type="file"
            style={{ width: "46%" }}
            helperText="Upload File Bukti"
            // defaultValue="Hello World"
          />
          <TextField
            required
            id="outlined-disabled"
            type="number"
            value={total}
            label="Total"
            onChange={totalHandler}
            disabled

            // defaultValue="Hello World"
          />
        </div>
        <Stack spacing={2} direction="row" marginTop={5}>
          <Button
            onClick={totalHandler}
            style={{ width: "25ch" }}
            color="success"
            variant="contained"
          >
            Save
          </Button>
          <Button type="submit" style={{ width: "25ch" }} variant="contained">
            Accept
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
