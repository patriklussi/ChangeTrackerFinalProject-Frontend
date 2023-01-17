import React, { useState, useEffect } from "react";
import "./Components.scss";
import "../Styles/Views.scss";
import LoremIpsum from "react-lorem-ipsum";
import { Navigate } from "react-router-dom";
export default function Notes(props) {
  let token = JSON.parse(sessionStorage.getItem("token"));
  let [NoteArray, setNoteArray] = useState({
    description: "No value yet",
  });
  const [newNote, setNewNote] = useState({
    description: "",
    dateOfWriting: "",
  });
  const [arrived, setArrived] = useState(false);
  const [noteData, setNoteData] = useState();
  const [editNote, setEditNote] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    console.log(props.chalId);
    const response = await fetch(
      `https://localhost:7056/api/Challenges/getDailyMsgs/${props.chalId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setNoteData(data);
      setArrived(true);
    }
  }
  async function addNote(e) {
    console.log(token);
    e.preventDefault();
    const response = await fetch(
      `https://localhost:7056/api/Challenges/addmsg/${props.chalId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      }
    );
    if (response.status === 200) {
      setEditNote(!editNote);
    }
  }
  function handleChange(e) {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="noteWrapper">
      {arrived ? (
        <section className="noteDisplayBody">
          {noteData?.length === 0 ? (
            <>
              <h1>No note for this challenge</h1>
              <button
                onClick={() => {
                  setEditNote(!editNote);
                }}
                className="addNoteButton"
              >
                Add note
              </button>
            </>
          ) : (
            <>
              {" "}
              <h1>Notes for your challenge</h1>
              <select
                onChange={(e) => {
                  setNoteArray({ description: e.target.value });
                }}
                className="notes-select"
                name="notes"
              >
                <option>Default value</option>
                {noteData?.map((x, index) => {
                  return (
                    <option key={index} value={x.description}>
                      {x.dateOfWriting.slice(0, x.dateOfWriting.indexOf("T"))}
                    </option>
                  );
                })}
              </select>
              <article className="note-display-card">
                {NoteArray.description}
              </article>
              <div style={{ marginTop: "15px" }} className="button-containerNotes">
                <button  style={{color:"black"}} className="edit">Edit note</button>
                <button style={{background:"#D11A2A",color:"black"}} className="delete">Delete note</button>{" "}
                <button
              
                onClick={() => {
                  setEditNote(!editNote);
                }}
                className="addNoteButton"
              >
                Add note
              </button>
              </div>
            </>
          )}

          {editNote ? (
            <article className="addChallengeContainer">
              <h1
                style={{ margin: "0", cursor: "pointer", marginRight: "auto" }}
                onClick={() => {
                  setEditNote(!editNote);
                }}
              >
                X
              </h1>
              <p>Add new note</p>
              <form className="noteForm" onSubmit={addNote}>
                <div className="inputBox">
                  <label className="labelForThis" htmlFor="challengeColor">
                    Description
                  </label>
                  <textarea
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="description"
                  />
                </div>
                <div className="inputBox">
                  <label className="labelForThis" htmlFor="dateOfWriting">
                    Date of writing
                  </label>
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="loginInput"
                    type="date"
                    name="dateOfWriting"
                  />
                </div>
                <input
                  className="registerButton"
                  type="submit"
                  value="Add note"
                />
              </form>
            </article>
          ) : (
            <></>
          )}
        </section>
      ) : (
        <h1>404 not found</h1>
      )}
    </div>
  );
}
