import React, { useState } from "react";
import cross from "../../assets/cross.jpg";
import { apiEndPoint, baseUrl } from "../../env";

export default function SignIn({ closeModal, setIsLoggedIn }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  async function handleLogin(e) {
    e.preventDefault();
    if (form?.username !== "" && form?.password !== "") {
      let response = await fetch(`${baseUrl}${apiEndPoint.login}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form?.username,
          password: form?.password,
        }),
      });
      if (response.ok) {
        response = await response.json();
        localStorage.setItem("token", response.token);
        window.location.assign("/");
        setIsLoggedIn(true);
      } else {
        alert("Username or password wrong");
      }
    }
  }
  function handleChange(e) {
    if (e.target.name === "email") {
      setForm({ ...form, username: e.target.value });
    } else if (e.target.name === "password") {
      setForm({ ...form, password: e.target.value });
    }
  }
  return (
    <div className="modal">
      <form className="modal-content" style={{ padding: "4rem" }}>
        <h1>Login</h1>
        <div className="input-fields">
          <label htmlFor="" style={{ padding: ".5rem" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            value={form?.username}
            onChange={handleChange}
            name="email"
            style={{ padding: ".5rem", border: "1px solid black" }}
          />
        </div>
        <div className="input-fields">
          <label htmlFor="" style={{ padding: ".5rem" }}>
            Password
          </label>
          <input
            type="text"
            placeholder="Enter Password"
            value={form?.password}
            onChange={handleChange}
            name="password"
            style={{ padding: ".5rem", border: "1px solid black" }}
          />
        </div>
        <button className="register-btn" onClick={handleLogin}>
          Login
        </button>
        <img
          src={cross}
          onClick={closeModal}
          alt=""
          width={30}
          style={{
            position: "fixed",
            top: "2rem",
            right: "2rem",
            cursor: "pointer",
          }}
        />
      </form>
    </div>
  );
}
