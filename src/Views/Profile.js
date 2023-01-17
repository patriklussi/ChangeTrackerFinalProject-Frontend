import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/Views.scss";
export default function Profile() {
  let temp = JSON.parse(sessionStorage.getItem("jwt"));
  let id = temp.name;
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState();
  const [arrived, setArrived] = React.useState(false);
  const [updatePage, setUpdatePage] = React.useState(true);
  const [updateInfo, setUpdateInfo] = React.useState({
    userId: "",
    firstName:"",
    lastName:"",
    userName:"",
    email:"",
    passWord:"",
  })
  useEffect(() => {
    if (sessionStorage.length === 0) {
      navigate("/login");
    } else {
      getUserInfo();
    }
  }, []);

  async function getUserInfo() {
    let temp = JSON.parse(sessionStorage.getItem("jwt"));
    let id = temp.name;
    const response = await fetch(`https://localhost:7056/api/Users/${id}`);
    const data = await response.json();
    setProfileData(data);
    console.log(data);
    if (response.status === 200) {
      setArrived(true);
    }
  }
  async function deleteProfile() {
   console.log(updateInfo);
    let token = JSON.parse(sessionStorage.getItem("token"));
    const response = await fetch(
      `https://localhost:7056/api/Users/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Deleted");
      sessionStorage.setItem("isLoggedIn", false);
      sessionStorage.clear();
      navigate("/login");
    }
  }
  function handleChange(e){
    
    setUpdateInfo({
      ...updateInfo,
    [e.target.name] : e.target.value,
    })
  }

 async function UpdateUser(e){
  console.log(updateInfo);
  e.preventDefault();
  let temp = JSON.parse(sessionStorage.getItem("jwt"));
    let id = temp.name;
    let token = JSON.parse(sessionStorage.getItem("token"));
  
    const response  = await fetch(`https://localhost:7056/api/Users/update/${id}`,{
      method:"POST",
      headers: {
        Authorization : `Bearer ${token}`,
        "Content-Type": "application/json",
      }
      
    });
    console.log(response.status);
    
  }
  return (
    <div className="grid-container">
      <Header></Header>

      {arrived ? (
        <>
          {updatePage ? (
            <article className="profileCard">
              <h1 style={{ margin: "0" }}>Your profile</h1>
              <div className="profileBoxContainer">
                <div className="profileBox">
                  <span>Name:</span>
                  <p>
                    {profileData.firstName} {profileData.lastName}
                  </p>
                </div>
                <div className="profileBox">
                  <span>Username:</span>
                  <p>{profileData.userName}</p>
                </div>
                <div className="profileBox">
                  <span>Email:</span>
                  <p>{profileData.email}</p>
                </div>
                <div className="profileBox">
                  <span>Password:</span>
                  <p>********</p>
                </div>
              </div>
              <div className="profileButtonContainer">
                {" "}
                <button
                  style={{ background: "  rgb(250, 250, 52) " }}
                  className="profileButton"
                  onClick={() => {
                    setUpdatePage(!updatePage);
                  }}
                >
                  Edit profile
                </button>
                <button
                  onClick={() => {
                    deleteProfile();
                  }}
                  className="profileButton"
                >
                  Delete profile
                </button>{" "}
              </div>
            </article>
          ) : (
            <article className="profileCard">
              <form onSubmit={UpdateUser} className="updateForm">
                <h1
                  style={{
                    margin: "0",
                    marginRight: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUpdatePage(!updatePage);
                  }}
                >
                  X
                </h1>
                <p style={{ margin: "0" }}>Update your account information</p>
                <div className="inputBox">
                  <label className="styledLabel">First name</label>
                  <input onChange={(e)=>{handleChange(e)}} className="loginInput" type="text" name="firstName" />
                </div>
                <div className="inputBox">
                  <label className="styledLabel">Last name</label>
                  <input  onChange={(e)=>{handleChange(e)}} className="loginInput" type="text" name="lastName" />
                </div>
                <div className="inputBox">
                  <label className="styledLabel">Username</label>
                  <input  onChange={(e)=>{handleChange(e)}} className="loginInput" type="text" name="userName" />
                </div>
                <div className="inputBox">
                  <label className="styledLabel">Email</label>
                  <input  onChange={(e)=>{handleChange(e)}} className="loginInput" type="text" name="email" />
                </div>
                <div className="inputBox">
                  <label className="styledLabel">Password</label>
                  <input  onChange={(e)=>{handleChange(e)}} className="loginInput" type="text" name="passWord" />
                </div>
                <input
                  style={{ width: "100%" }}
                  className="registerButton"
                  type="submit"
                  value="Update account"
                />
              </form>
            </article>
          )}
        </>
      ) : (
        <h1>Profile not found</h1>
      )}
    </div>
  );
}
