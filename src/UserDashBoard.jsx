import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./UserDashBoard.css";
function UserDashBoard() {
  const { loggedUser } = useParams();
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      let tempresp = [];
      tempresp = response.data;
      tempresp.forEach((r) => {
        if (r.email === loggedUser) {
          setuserDetails(r);
        }
      });
    });
  }, []);
  console.log("Userr>>>>>>>>", userDetails);

  const [firstName, setfirstName] = useState("1");
  const [lastName, setlastName] = useState("1");
  const [email, setemail] = useState("1");
  const [password, setpassword] = useState("1");
  const [age, setage] = useState("1");
  const [city, setcity] = useState("1");
  const [gender, setgender] = useState("1");
  const [phone, setphone] = useState("1");
  const [linkedIn, setlinkedIn] = useState("1");
  const [terms, setterms] = useState("1");
  const [cond, setcond] = useState(loggedUser);
  console.log("condd >>>>", cond);
  const updateUser = () => {
    axios
      .post("http://localhost:3001/api/updateUser", {
        //

        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        age: age,
        city: city,
        gender: gender,
        phone: phone,
        linkedIn: linkedIn,
        terms: terms,
        cond: cond,
      })
      .then(() => {
        alert("UPDATED SUCCESSFULLY");
      });
  };
  return (
    <div>
      <h1>USER DASHBOARD</h1>
      <div className="form">
        <div>
          <b>FirstName:</b>
          <input
            className="ipbox"
            type="text"
            placeholder={userDetails.firstname}
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
          />
        </div>

        <div>
          <b>LastName:</b>
          <input
            className="ipbox"
            type="text"
            placeholder={userDetails.lastname}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
          />
        </div>

        <div>
          <b>Email:</b>
          <input
            className="ipbox"
            type="email"
            placeholder={userDetails.email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>

        <div>
          <b>Password:</b>
          <input
            className="ipbox"
            type="password"
            placeholder="******"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>

        <div>
          <b>Age:</b>
          <input
            className="ipbox"
            type="number"
            placeholder={userDetails.age}
            onChange={(e) => {
              setage(e.target.value);
            }}
          />
        </div>

        <div>
          <b>City</b>
          <select
            className="ipbox"
            name="city"
            id=""
            style={{ width: "325px" }}
            defaultValue={userDetails.city}
            onChange={(e) => {
              setcity(e.target.value);
            }}
          >
            <option value="Chennai">Chennai</option>
            <option value="Madurai">Madurai</option>
            <option value="Vellore">Vellore</option>
          </select>
        </div>

        <div>
          <b>Gender:</b>
          <input
            className="ipbox"
            type="text"
            placeholder={userDetails.gender}
            onChange={(e) => {
              setgender(e.target.value);
            }}
          />
        </div>

        <div>
          <b>Phone Number: </b>
          <input
            className="ipbox"
            type="text"
            placeholder={userDetails.phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
        </div>

        <div>
          <b>LinkedIn</b>
          <input
            className="ipbox"
            type="text"
            placeholder={userDetails.linkedin}
            onChange={(e) => {
              setlinkedIn(e.target.value);
            }}
          />
        </div>

        <button className="btn" onClick={updateUser}>
          UPDATE DETAILS
        </button>

        <Link to="/login">
          <button className="btn">LOGOUT</button>
        </Link>
      </div>
    </div>
  );
}

export default UserDashBoard;
