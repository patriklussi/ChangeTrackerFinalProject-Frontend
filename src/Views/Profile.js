import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/Views.scss";
import editIcon from "../assets/svg/editIcon.svg";
export default function Profile() {
  let temp = JSON.parse(sessionStorage.getItem("jwt"));
  let id = temp.name;
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState();
  const [arrived, setArrived] = React.useState(false);
  const [updatePage, setUpdatePage] = React.useState(true);
  const [updateInfo, setUpdateInfo] = React.useState({
    userId: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    passWord: "",
  });
  useEffect(() => {
    if (sessionStorage.length === 0) {
      navigate("/login");
    } else {
      getUserInfo();
    }
  }, []);

  const getUserInfo = async () => {
    let temp = JSON.parse(sessionStorage.getItem("jwt"));
    let id = temp.name;
    const response = await fetch(`https://localhost:7056/api/Users/${id}`);
    const data = await response.json();
    setProfileData(data);
    console.log(data);
    if (response.status === 200) {
      setArrived(true);
    }
  };
  const deleteProfile = async () => {
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
  };
  const handleChange = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  };

  async function UpdateUser(e) {
    console.log(updateInfo);
    e.preventDefault();
    let temp = JSON.parse(sessionStorage.getItem("jwt"));
    let id = temp.name;
    let token = JSON.parse(sessionStorage.getItem("token"));

    const response = await fetch(
      `https://localhost:7056/api/Users/update/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.status);
  }
  return (
    <div className="grid-container">
      <Header></Header>
      {arrived ? (
        <>
          <section className="profileCard">
            <h1 style={{ margin: "0" }}>Your profile</h1>
            <div className="profileBoxContainer">
              <div className="profileBox--editInputContainer">
                <label htmlFor="fullName">Full name</label>
                <div className="profileBox--editInputContainer">
                  <input
                    id="fullName"
                    name="name"
                    readOnly
                    value={profileData.firstName + " " + profileData.lastName}
                  />
                  <button className="profileBox--editIconButton">
                    <img
                      className="profileBox--icon"
                      src={editIcon}
                      alt="Icon showing a pen to symbolize editing"
                    />{" "}
                  </button>
                </div>
              </div>
              <div className="profileBox--editInputContainer">
                <label htmlFor="userName">Username</label>
                <input
                  id="userName"
                  name="userName"
                  readOnly
                  value={profileData.userName}
                />
                <button className="profileBox--editIconButton">
                  <img
                    className="profileBox--icon"
                    src={editIcon}
                    alt="Icon showing a pen to symbolize editing"
                  />{" "}
                </button>
              </div>
              <div className="profileBox--editInputContainer">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  readOnly
                  value={profileData.email}
                />
                <button className="profileBox--editIconButton">
                  <img
                    className="profileBox--icon"
                    src={editIcon}
                    alt="Icon showing a pen to symbolize editing"
                  />{" "}
                </button>
              </div>
              <div className="profileBox--editInputContainer">
                <label htmlFor="password">Password</label>
                <input id="password" name="passWord" readOnly value="*******" />
                <button className="profileBox--editIconButton">
                  <img
                    className="profileBox--icon"
                    src={editIcon}
                    alt="Icon showing a pen to symbolize editing"
                  />{" "}
                </button>
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
          </section>
        </>
      ) : (
        <h1>Profile not found</h1>
      )}
    </div>
  );
}
