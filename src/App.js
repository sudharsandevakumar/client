import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Login from "./Login";
import UserDashBoard from "./UserDashBoard";
import AdminDashBoard from "./AdminDashBoard";
function App() {
  let lcfn = localStorage.getItem("firstname")
    ? localStorage.getItem("firstname")
    : "";
  let lcln = localStorage.getItem("lastname")
    ? localStorage.getItem("lastname")
    : "";
  let lcemail = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "";

  let lcpass = localStorage.getItem("password")
    ? localStorage.getItem("password")
    : "";
  let lcage = localStorage.getItem("age") ? localStorage.getItem("age") : "";
  let lccity = localStorage.getItem("city") ? localStorage.getItem("city") : "";
  let lcphone = localStorage.getItem("phone")
    ? localStorage.getItem("phone")
    : "";
  let lclinkedIn = localStorage.getItem("linkedin")
    ? localStorage.getItem("linkedin")
    : "";
  const [firstName, setfirstName] = useState(lcfn);
  const [lastName, setlastName] = useState(lcln);
  const [email, setemail] = useState(lcemail);
  const [password, setpassword] = useState(lcpass);
  const [age, setage] = useState(lcage);
  const [city, setcity] = useState(lccity);
  const [gender, setgender] = useState("");
  const [phone, setphone] = useState(lcphone);
  const [linkedIn, setlinkedIn] = useState(lclinkedIn);
  const [terms, setterms] = useState(false);

  const [validEmail, setvalidEmail] = useState(true);
  const [validPassword, setvalidPassword] = useState(true);
  const [validAge, setvalidAge] = useState(true);
  const [validPh, setvalidph] = useState(true);

  const [userList, setuserList] = useState([]);

  const { loggedUser } = useParams();
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setuserList(response.data);
    });
  }, []);

  const savedraft = () => {
    localStorage.setItem("firstname", firstName);
    localStorage.setItem("lastname", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("age", age);
    localStorage.setItem("city", city);
    localStorage.setItem("phone", phone);
    localStorage.setItem("linkedin", linkedIn);
  };

  const registerUser = () => {
    let emailpattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(emailpattern)) {
      if (password.length > 6) {
        if (age > 18) {
          Axios.post("http://localhost:3001/api/insertUser", {
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
            userStatus: "Submitted",
          }).then(() => {
            alert("SIGNED UP SUCCESSFULLY!!!");
          });
          setfirstName("");
          setlastName("");
          setemail("");
          setpassword("");
          setage("");
          setcity("");
          setgender("");
          setphone("");
          setlinkedIn("");
          setterms("");
          alert("SIGNED UP SUCCESSFULLY!!!");
        } else {
          alert("Age should be greater than 18!");
        }
      } else {
        alert("PASSWORD SHOULD BE GREATER THAN 6 CHARACTERS");
      }
    } else {
      alert("INVALID EMAIL");
    }
  };

  console.log(userList);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="form">
                <h1> USER REGISTERATION</h1>
                <div>
                  <b>FirstName:</b>
                  <input
                    className="ipbox"
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                    onChange={(e) => {
                      setfirstName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div>
                  <b>LastName:</b>
                  <input
                    type="text"
                    className="ipbox"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => {
                      setlastName(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <b>Email:</b>
                  <input
                    type="email"
                    className="ipbox"
                    value={email}
                    placeholder="email"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    onBlur={(e) => {
                      let emailpattern =
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                      if (email.match(emailpattern)) {
                        setvalidEmail(true);
                      } else {
                        setvalidEmail(false);
                      }
                    }}
                    required
                  />
                  {!validEmail && (
                    <b style={{ color: "red" }}>Invalid Email!</b>
                  )}
                </div>

                <div>
                  <b>Password:</b>
                  <input
                    type="password"
                    className="ipbox"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (password.length >= 6) {
                        setvalidPassword(true);
                      } else {
                        setvalidPassword(false);
                      }
                    }}
                    required
                  />
                  {!validPassword && (
                    <b style={{ color: "red" }}>
                      Password should contain atleast 6 characters!
                    </b>
                  )}
                </div>
                <div>
                  <b>Age:</b>
                  <input
                    type="number"
                    className="ipbox"
                    placeholder="age"
                    value={age}
                    onChange={(e) => {
                      setage(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (age > 18) {
                        setvalidAge(true);
                      } else {
                        setvalidAge(false);
                      }
                    }}
                    required
                  />
                  {!validAge && (
                    <b style={{ color: "red" }}>
                      Age should be greater than 18!
                    </b>
                  )}
                </div>

                <div>
                  <b>City:</b>
                  <select
                    name="city"
                    className="ipbox"
                    id=""
                    onChange={(e) => {
                      setcity(e.target.value);
                    }}
                    defaultValue={city}
                    style={{ width: "325px" }}
                    required
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Vellore">Vellore</option>
                  </select>
                </div>

                <div style={{ alignContent: "left" }}>
                  <b>Gender:</b>
                  <div style={{ flexDirection: "row" }}>
                    <input
                      type="radio"
                      value="male"
                      onChange={(e) => {
                        setgender(e.target.value);
                        console.log("GENDER>>>", e.target.value);
                      }}
                      name="gender"
                      id="male"
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div style={{ flexDirection: "row" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      id="female"
                      onChange={(e) => {
                        setgender(e.target.value);
                        console.log("GENDER>>>", e.target.value);
                      }}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                <div>
                  <b>Phone Number:</b>
                  <input
                    type="number"
                    className="ipbox"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => {
                      setphone(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (phone.length == 10) {
                        setvalidph(true);
                      } else {
                        setvalidph(false);
                      }
                    }}
                    required
                  />
                  {!validPh && (
                    <b style={{ color: "red" }}>
                      Phone number should contain 10 digits!
                    </b>
                  )}
                </div>

                <div>
                  <b>LinkedIn:</b>
                  <input
                    type="text"
                    className="ipbox"
                    value={linkedIn}
                    placeholder="Linkedin id"
                    onChange={(e) => {
                      setlinkedIn(e.target.value);
                    }}
                  />
                </div>

                <div
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    id="termsandcond"
                    onChange={(e) => {
                      setterms(!terms);
                    }}
                    required
                  />
                  <label htmlFor="termsandcond">
                    Yes, I agree to the terms and conditions.
                  </label>
                </div>

                <button className="btn" onClick={registerUser}>
                  REGISTER
                </button>
                <b>or</b>
                <Link to="/login">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "600",
                      fontFamily: "monospace",
                    }}
                  >
                    Alredy have an Account? LOGIN
                  </button>
                </Link>

                <button className="btn" onClick={savedraft}>
                  SAVE DRAFT
                </button>
              </div>
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard/:loggedUser" element={<UserDashBoard />} />
        <Route path="/admindashboard" element={<AdminDashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
