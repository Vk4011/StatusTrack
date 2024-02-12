import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import baseURL from "./baseURL"; // Importing baseURL

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() !== "") {
      try {
        const response = await axios.get(`${baseURL}/getScript`, {
          params: {
            editorId: username, // Use username as editorId
          },
        });
        if (response.status === 200) {
          navigate(
            `/text-editor?username=${username}&editorId=${response.data}`
          );
        } else {
          throw new Error("Failed to fetch script");
        }
      } catch (error) {
        console.error("Error fetching script:", error);
        alert(
          "An error occurred while fetching the script. Please try again later."
        );
      }
    }
  };

  return (
    <div className="login">
      <center>
        <h2>Enter Your Username</h2>
        <form onSubmit={handleSubmit}>
          <div className="loginelement">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="inputuser"
            />
            <button className="cssbuttons-io" type="submit">
              <span>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                    fill="currentColor"
                  ></path>
                </svg>
                Login
              </span>
            </button>
          </div>
        </form>
      </center>
    </div>
  );
}

export default Login;
