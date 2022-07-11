import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [userList, setuserList] = useState([]);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      let userCred = [];
      let lgstatus = 0;
      let err = "";
      userCred = response.data;
      console.log(response.data);
      userCred.forEach((u) => {
        if (email === u.email) {
          if (password === u.password) {
            lgstatus = 1;
            if (u.type === "admin") {
              navigate("/admindashboard");
            } else {
              navigate(`/userdashboard/${u.email}`);
            }
          } else {
            err = "Invalid Password!";
          }
        } else {
          err = "Invalid UserId!";
        }
      });

      if (lgstatus) {
        alert("logged in!");
      } else {
        alert(err);
      }
    });
  };
  return (
    <div>
      <h1>LOGIN</h1>
      <div className="form">
        <input
          className="ipbox"
          type="email"
          placeholder="email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          className="ipbox"
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button
          className="btn"
          style={{
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            fontFamily: "monospace",
          }}
          onClick={login}
        >
          LOGIN
        </button>
        <button className="btn">Forget Password</button>

        <b>or</b>
        <Link to="/">
          <button
            className="btn"
            style={{
              backgroundColor: "rgb(236, 5, 67)",
              color: "white",
              fontWeight: "600",
              fontFamily: "monospace",
            }}
          >
            CREATE NEW ACCOUNT
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
