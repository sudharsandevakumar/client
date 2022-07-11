import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminDashBoard.css";
function AdminDashBoard() {
  const [userList, setuserList] = useState([]);
  const [vStatus, setVstatus] = useState("");
  const [renderCond, setrenderCond] = useState("all");
  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      setuserList(response.data);
      console.log(response.data);
    });
  }, []);

  const updateStatus = (id) => {
    console.log("VSTATUSS>>>>>", vStatus);
    axios
      .put("http://localhost:3001/updateStatus", { vStatus: vStatus, id: id })
      .then((response) => {
        alert("UPDATED");
        setuserList(
          userList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  firstname: val.firstname,
                  lastname: val.lastname,
                  email: val.email,
                  age: val.age,
                  city: val.city,
                  gender: val.gender,
                  phone: val.phone,
                  linkedin: val.linkedin,
                  status: vStatus,
                }
              : val;
          })
        );
      });
  };

  const handleFilterChange = (e) => {
    const filterChoise = e.target.value;
    setrenderCond(filterChoise);
  };

  console.log(userList);
  return (
    <div>
      <h1>ADMIN DASHBOARD</h1>
      <div className="filter">
        <h3>Filter by status:</h3>
        <select name="" id="" onChange={handleFilterChange}>
          <option value="all">[Choose an option]</option>
          <option value="Submitted">Submitted</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <div className="users">
        {userList.map((val) => {
          return (
            <>
              {val.status == renderCond && (
                <div key={val.id} className="user">
                  <div>
                    <h3>FirstName: {val.firstname}</h3>
                    <h3>LastName: {val.lastname}</h3>
                    <h3>email: {val.email}</h3>
                    <h3>age: {val.age}</h3>
                    <h3>city: {val.city}</h3>
                    <h3>gender: {val.gender}</h3>
                    <h3>phone: {val.phone}</h3>
                    <h3>LinkedIn: {val.linkedin}</h3>
                    <h3
                      style={
                        val.status == "Verified"
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      status: {val.status}
                    </h3>
                  </div>

                  <div>
                    Verify:
                    <select
                      name=""
                      onChange={(e) => {
                        setVstatus(e.target.value);
                        console.log(e.target.value);
                      }}
                      id=""
                    >
                      <option value="Verified">Verify</option>
                      <option value="Rejected">Reject</option>
                    </select>
                    <button
                      onClick={() => {
                        updateStatus(val.id);
                      }}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              )}

              {val.status == "all" && (
                <div key={val.id} className="user">
                  <div>
                    <h3>FirstName: {val.firstname}</h3>
                    <h3>LastName: {val.lastname}</h3>
                    <h3>email: {val.email}</h3>
                    <h3>age: {val.age}</h3>
                    <h3>city: {val.city}</h3>
                    <h3>gender: {val.gender}</h3>
                    <h3>phone: {val.phone}</h3>
                    <h3>LinkedIn: {val.linkedin}</h3>
                    <h3
                      style={
                        val.status == "Verified"
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      status: {val.status}
                    </h3>
                  </div>

                  <div>
                    Verify:
                    <select
                      name=""
                      onChange={(e) => {
                        setVstatus(e.target.value);
                        console.log(e.target.value);
                      }}
                      id=""
                    >
                      <option value="Verified">Verify</option>
                      <option value="Rejected">Reject</option>
                    </select>
                    <button
                      onClick={() => {
                        updateStatus(val.id);
                      }}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashBoard;
