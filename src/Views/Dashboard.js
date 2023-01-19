import "../Styles/Views.scss";
import Header from "../Components/Header";
import React, { useState, useEffect } from "react";

import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import ChallengeCard from "../Components/ChallengeCard";
import AddChallenge from "../Components/AddChallenge";
import PlusSign from "../assets/svg/plussign.svg";
export default function Dashboard() {
  const [challenge, setChallenge] = useState(null);
  const [renderElement, setRenderElement] = useState(false);
  const [placeHolder, setPlaceHolder] = useState(false);
  const [addActive, setAddActive] = useState(false);

  const navigate = useNavigate();

  let id;
  let ss;
  useEffect(() => {
    let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIN"));
    if (isLoggedIn === false) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    ss = JSON.parse(sessionStorage.getItem("jwt"));
    if (ss === null) {
      navigate("/login");
    }
    id = Number(ss.name);
  }, []);

  useEffect(() => {
    getChallenge();
  }, []);

  async function getChallenge() {
    let token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    try {
      const response = await fetch(
        `https://localhost:7056/api/Users/getUserChallenges/${id} `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 400) {
        setPlaceHolder(!placeHolder);
      }
      const data = await response.json();
      setChallenge(data);
    } catch (err) {
      setPlaceHolder(!placeHolder);
    }
    setRenderElement(!renderElement);
  }

  console.log(challenge);

  return (
    <div className="wrapper">
      <div className="grid-container">
        <Header></Header>

        <section className="dashboard-main-section">
          <h1>Quickview for your challenges</h1>
          <div className="challengeCardContainer">
            {placeHolder ? (
              <h1 style={{ marginTop: "150px" }}>Challenges not found</h1>
            ) : (
              <>
                {" "}
                {challenge?.length === 0 ? (
                  <article className="no-active-box">
                    <h2>You have no active challenges :(</h2>
                  </article>
                ) : (
                  <>
                    {challenge?.map((x, index) => {
                      return (
                        <ChallengeCard
                      
                          key={index}
                          daysLeft={x.daysLeft}
                          color={x.challengeColor}
                          setChallenge={setChallenge}
                          id={x.challengeId}
                          title={x.challengeName}
                          startDate={x.startDate}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
          {challenge?.length < 3 ? (
            <button
              onClick={() => {
                setAddActive(true);
              }}
              className="addChallenge"
            >
              Add challenge
            </button>
          ) : (
            <></>
          )}
        </section>
        {addActive ? (
          <AddChallenge   getChallenges={getChallenge} title="Create your own 90 day challenge" disable={setAddActive}></AddChallenge>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
