import React, { useState, useEffect } from "react";
import "./Components.scss";
import { json } from "react-router-dom";
export default function UpateChallenge(props) {
  let name = JSON.parse(sessionStorage.getItem("jwt"));
  let token = JSON.parse(sessionStorage.getItem("token"));
  let id = Number(name.name);

  const [dataToSend, setDataToSend] = useState({
    challengeId: props.chalId,
    challengeName: "",
    challengeDescription: "",
    startDate: "",
    challengeColor: "",
  });

  function UpdateChallenge(e) {
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
        ` https://localhost:7056/api/Challenges/update/${props.chalId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      const responseCode = response;
      const data = response.json();
      if (responseCode === 200) {
        setTimeout(() => {
          props.disable(false);
        }, 3000);
        console.log("added");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="addChallengeContainer">
      <div
        className="xButton"
        onClick={() => {
          props.edit(false);
        }}
      >
        X
      </div>
      <form className="updateChallengeForm" onSubmit={UpdateChallenge}>
        <h2>Update challenge information</h2>
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
