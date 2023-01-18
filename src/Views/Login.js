import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Views.scss";
import Logo from "../assets/svg/logo.svg";
import jwt_decode from "jwt-decode";
export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loginDataToSend, setLoginDataToSend] = useState({
    userName: "",
    passWord: "",
  });
  
  const goToRegister = () => {
    navigate("/createaccount");
  };
 
  const handleChange = () => {
    setLoginDataToSend({
      ...loginDataToSend,
      [e.target.name]: e.target.value,
    });
  }
  async function TryLogIn(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7056/api/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDataToSend),
      });
      const responseCode = response;
      const data = await response.json();

      var decoded = jwt_decode(data.token);
      sessionStorage.setItem("token", JSON.stringify(data.token));
      sessionStorage.setItem("jwt", JSON.stringify(decoded));

      if (responseCode.status === 200) {
        navigate("/dashboard");
        sessionStorage.setItem("isLoggedIn", true);
      }
      console.log(responseCode.message);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <div className="wrapper">
      <div className="grid-container">
        <div className="white-background-container">
          <article className="titleImgContainer">
            <img src={Logo} />
            <h1> ChangeTracker</h1>
          </article>
          <p>Log in to start using ChangeTracker</p>
          {error !== null ? (
            <span style={{ color: "red" }}>{error}</span>
          ) : (
            <></>
          )}
          <form className="formLogin" onSubmit={TryLogIn}>
            <article className="inputBox">
              <label htmlFor="userName" className="styledLabel">
                Username
              </label>
              <input
                placeholder="Username"
                required
                className="loginInput"
                type="text"
                name="userName"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </article>

            <article className="inputBox">
              <label htmlFor="passWord" className="styledLabel">
                Password
              </label>
              <input
                placeholder="*******"
                required
                className="loginInput"
                type="password"
                name="passWord"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </article>

            <div className="ContainerForCheckBoxAndLink">
              <a href="#">Forgot password or email</a>
              <label htmlFor="checkSignedIn" className="checkBoxLabel">
                {" "}
                <input name="checkSignedIn" type={"checkbox"} />
                Stay signed in
              </label>
            </div>

            <input className="submitInput" type="submit" value="Sign in" />
            <div className="formLine"> </div>
            <h2>No ChangeTracker account?</h2>
            <button className="registerButton" onClick={goToRegister}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/createaccount"}
              >
                Create account
              </Link>
            </button>
          </form>
        </div>

        <section className="login-picture-box"></section>
      </div>
    </div>
  );
}

/* {state?.map((x,index) => {
          return (
            <h1 key={index}>{x.challengeName}</h1>
          )
        })} */

// //   const [state, setState] = useState();
// //   useEffect(()=>{
// // getDataFromDB();
// //   },[]);
//   // async function getWeather() {

//   //
//   //   const response = await fetch("https://localhost:7056/api/Users", {
//   //     method: 'GET',
//   //     // headers: {

//   //     //   'Content-Type': 'application/json'
//   //     // },

//   //     // body: JSON.stringify(dataToSend) // body data type must match "Content-Type" header
//   //   });
//   const dataToSend = {
//         userId: 0,
//         userName: "Dicky",
//         firstName: "Slick",
//         lastName: "Rick",
//         password:"idiot",
//         email: "rickdoggy@gmail.com",
//         birthDate: "1980-02-10"
//       }

//     const  getDataFromDB =  async () => {
//       const response = await fetch("https://localhost:7056/api/Users/crateaccount", {
//       method: 'POST',
//       headers: {

//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(dataToSend),
//     });
//     const data = await response.json();
//     console.log(response);

//     // setState(data.challenges);
//     }
