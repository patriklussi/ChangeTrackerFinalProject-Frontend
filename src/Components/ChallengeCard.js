import "../Styles/Views.scss";
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
export default function ChallengeCard(props) {
  const percentage = 44;
  const navigate = useNavigate();
  function GoToInspectView(userId) {
    navigate("/challengeview",{state:{id:props.id}} );
  }

  async function QuickDelete(id) {
    console.log(id);
    const response = await fetch(
      `https://localhost:7056/api/Challenges/deletechallenge/${id} `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    props.setChallenge(null);
    console.log(data);
  }
  function calculatePercentage() {
    return props.daysLeft / 90;
  }
  console.log(props.color);
  console.log(calculatePercentage);
  return (
    <article className="challengeCard">
      <article style={{ background: props.color }} className="colorDiv">
        <p>90 day challenge</p>
      </article>
      <div className="content-container">
        <div className="circleContainer">
          <CircularProgressbar
          style={{  pathColor: props.color/100,}}
            text={props.daysLeft}
            value={calculatePercentage()}
          ></CircularProgressbar>
        </div>
        <h2 style={{fontSize:"15px"}}>{props.title}</h2>
       
        <p> Created at {props.startDate.slice(0 , props.startDate.indexOf("T"))}</p>

        <div className="buttonCardContainer">
          
          <button
            onClick={() => {
              GoToInspectView(props.challengeId);
            }}
            className="buttonContainerButton"
          >
            View challenge
          </button>
        </div>
      </div>
    </article>
  );
}
