import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AddChallenge from "./AddChallenge";
import "../Styles/Views.scss";
import UpateChallenge from "./UpdateChallenge";
import { Navigate, useNavigate } from "react-router-dom";
export default function Tracker(props) {
  const [timeLeft, setTimeLeft] = useState();
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    calculatePercentageOfCircle();
  }, []);

  function calculatePercentageOfCircle() {
    setTimeLeft(props.daysLeft / 90);
  }

  async function deleteChallenge() {
    let token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await fetch(
        `https://localhost:7056/api/Challenges/deletechallenge/${props.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {edit ? (
        <UpateChallenge chalId={props.id} edit={setEdit}></UpateChallenge>
      ) : (
        <>
          <section className="tracker">
            <article className="tracker-content">
              <p>Days left:</p>
              <div className="progressCircleContainer">
                <CircularProgressbar
                  text={props.daysLeft}
                  value={timeLeft}
                ></CircularProgressbar>
              </div>
              <h2>{props.name}</h2>
              <div>
                <p style={{ fontSize: "12px" }}>Description</p>
                <p>{props.description}</p>
              </div>
            </article>

            <div className="button-container">
              <button
                onClick={() => {
                  setEdit(!edit);
                }}
                className="edit"
                style={{color:"black"}}
              >
                Edit
              </button>
              <button  style={{color:"black"}}onClick={deleteChallenge} className="delete">
                {" "}
                Delete
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
}
