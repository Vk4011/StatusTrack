// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== "") {
      // Redirect to the text editor page with the username as a query parameter
      navigate(`/text-editor?username=${username}`);
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

            <button class="cssbuttons-io" type="submit">
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
