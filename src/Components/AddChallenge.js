import React, { useState, useEffect } from "react";
import "./Components.scss";
import { Navigate, json, useNavigate } from "react-router-dom";
export default function AddChallenge(props) {
  let name = JSON.parse(sessionStorage.getItem("jwt"));
  let token = JSON.parse(sessionStorage.getItem("token"));
  let id = Number(name.name);
  const [dataToSend, setDataToSend] = useState({
    challengeName: "",
    challengeDescription: "",
    startDate: "",
    challengeColor: "",
  });
  const [error,setError] = useState(null);

  function AddChallenge(e) {
    e.preventDefault();
    sendChallenge();
  }
  function handleChange(e) {
    setDataToSend({
      ...dataToSend,
      [e.target.name]: e.target.value,
    });
  }

  async function sendChallenge() {
    try {
      console.log(id);
      const response = await fetch(
        ` https://localhost:7056/api/Challenges/addchallenge/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      const responseCode = response;

      if (responseCode.status === 200) {
        props.disable(false);
  
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  return (
    <div className="addChallengeContainer">
      <div
        className="xButton"
        onClick={() => {
          props.disable(false);
        }}
      >
        X
      </div>
      <form className="createChallengeForm" onSubmit={AddChallenge}>
        <h2>{props.title}</h2>
   
        <div className="inputBox">
          <label className="labelForThis" htmlFor="title">
            Challenge title
          </label>
          <input
            required
            className="loginInput"
            type="text"
            name="challengeName"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="inputBox">
          <label className="labelForThis" htmlFor="challengeDescription">
            Description
          </label>
          <textarea
            required
            name="challengeDescription"
            placeholder="Add a description"
            className="textAreaInput"
            onChange={(e) => {
              handleChange(e);
            }}
          ></textarea>
        </div>
        <div className="inputBox">
          <label className="labelForThis" htmlFor="startDate">
            Start date
          </label>
          <input
            required
            onChange={(e) => {
              handleChange(e);
            }}
            className="dateInput"
            name="startDate"
            type="date"
          />
        </div>

        <div className="inputBox">
          <label className="labelForThis" htmlFor="challengeColor">
            Color
          </label>
          <input
            required
            onChange={(e) => {
              handleChange(e);
            }}
            type="color"
            name="challengeColor"
          />
        </div>

        <input className="registerButton" type="submit" value="Add challenge" />
      </form>
    </div>
  );
}
