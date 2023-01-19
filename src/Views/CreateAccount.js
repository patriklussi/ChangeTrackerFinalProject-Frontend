import React, {useState}from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/svg/logo.svg";
import "../Styles/Views.scss";
export default function CreateAccount() {
  let navigate = useNavigate();
  const [FormData, setFormData] = React.useState({
    userId: 0,
    firstName: "",
    lastName: "",
    userName: "",
    passWord: "",
    email: "",
  });
  const [createdAccountMessage,setCreatedAccountMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:7056/api/Users/createaccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        }
      );
        
      console.log(response);
      if (response.status === 200) {
        setCreatedAccountMessage(true);
        setTimeout(()=>{
          navigate("/");
        },2000)
      
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <div className="grid-container">
        <div className="white-background-container">
          <article className="titleImgContainer">
            <img src={Logo} />
            <h1> ChangeTracker</h1>
          </article>
          <p>Create your ChangeTracker account!</p>
          {createdAccountMessage ?  <span style={{color:"green",margin:"0 auto"}} >Account created!</span> : <></>}
          <form className="formCreateAccount" onSubmit={submitData}>
            <div className="inputBox">
              <label className="styledLabel">Username</label>
              <input
                placeholder="Username"
                type="text"
                className="loginInput"
                name="userName"
                required
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="nameBox">
              <div className="nameBoxContainer">
                <label className="styledLabel">First name</label>
                <input
                  placeholder="First name"
                  type="text"
                  name="firstName"
                  required
                  className="loginInput"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="nameBoxContainer">
                <label className="styledLabel">Last name</label>
                <input
                  placeholder="Last name"
                  type="text"
                  name="lastName"
                  required
                  className="loginInput"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>

            <div className="inputBox">
              <label className="styledLabel">Email:</label>
              <input
                placeholder="email@example.com"
                type="email"
                name="email"
                required
                className="loginInput"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="inputBox">
              <label className="styledLabel">Password</label>
              <input
                placeholder="*******"
                type="password"
                name="passWord"
                required
                className="loginInput"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="ContainerForCheckBoxAndLink">
              <label className="checkBoxLabel">
                {" "}
                <input type={"checkbox"} />
                Agree to terms and conditions.
              </label>
              <label className="checkBoxLabel">
                {" "}
                <input type={"checkbox"} />
                Agree to GDPR
              </label>
            </div>
            <input className="submitInput" type="submit" value="Submit" />
            <p>
              Already have an account?{" "}
              <Link
                style={{ textDecoration: "underline", color: "black" }}
                to={"/login"}
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
