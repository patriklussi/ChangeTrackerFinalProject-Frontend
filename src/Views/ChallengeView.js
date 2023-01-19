import Header from "../Components/Header";
import "../Styles/Views.scss";
import Notes from "../Components/Notes";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tracker from "../Components/Tracker";

export default function ChallengeView(props) {
  const [challengeData, setChallengeData] = useState();
  const [active, setActive] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [arrived, setArrived] = useState(false);
  let token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    if (sessionStorage.length === 0) {
      navigate("/login");
    } else {
      fetchChallengeData();
    }
  }, []);
  function switchTab() {
    setActive(!active);
  }

  const fetchChallengeData = async () => {
    const url = `https://localhost:7056/api/Challenges/${location.state.id}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setChallengeData(data);
      setArrived(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      {arrived ? (
        <div className="grid-container">
          <Header />
          <div className="tab">
            <div
              className="tab--button"
              style={{ opacity: `${active ? "1" : "0.5"}` }}
              onClick={switchTab}
            >
              <h4>Tracker</h4>
            </div>
            <div
              className="tab--button"
              style={{ opacity: `${active ? "0.5" : "1"}` }}
              onClick={switchTab}
            >
              {" "}
              <h4>Notes</h4>
            </div>
          </div>
          {/* <p style={{ margin: "25px auto 0 0" }}>Go back</p> */}
          {active ? (
            <Tracker
              fetchChallenge={fetchChallengeData}
              daysLeft={challengeData?.daysLeft}
              description={challengeData?.challengeDescription}
              name={challengeData?.challengeName}
              id={challengeData?.challengeId}
              endDate={challengeData?.endDate}
            ></Tracker>
          ) : (
            <Notes chalId={location.state.id}></Notes>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
