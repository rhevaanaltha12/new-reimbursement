import React, { useContext, useState } from "react";
import "./login.css";
import Icon from "../../assets/Illustration.png";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Login() {
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        // console.log(user);
        alert("Login Success");
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login">
      <div className="left">
        <img src={Icon} alt="" className="login-icon" />
      </div>
      <div className="right">
        <div className="text">Welcome to</div>
        <div className="subText">Our Dashboard</div>
        <div className="center">
          <div className="google">
            <GoogleIcon className="text-icon" /> Google
          </div>
          <div className="facebook">
            <FacebookIcon className="text-icon" /> Facebook
          </div>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-password-input"
                label="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="success">
                Login
              </Button>
            </div>
          </Box>
          {error && (
            <div className="err">Please Input Correct Email and Password !</div>
          )}
          <div className="register">
            Don’t have an account? <span>Register</span>
          </div>
        </div>
      </div>
    </div>
  );
}
