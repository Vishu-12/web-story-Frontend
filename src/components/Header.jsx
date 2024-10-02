import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Register from "./modals/Register";
import SignIn from "./modals/SignIn";
import { IoPersonCircle } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoBookmark } from "react-icons/io5";
import AddStory from "./modals/AddStory";

export default function Header() {
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [storyModal, setStoryModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hamburgItems, setHamburgItems] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegisterModalOpen = () => {
    setRegisterModal(true);
  };

  const handleRegisterModalClose = () => {
    setRegisterModal(false);
  };
  const handleLoginModalOpen = () => {
    setLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setLoginModal(false);
  };
  const handleStoryModalOpen = () => {
    setStoryModal(true);
  };

  const handleStoryModalClose = (e) => {
    e.preventDefault();
    setStoryModal(false);
  };

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  const handleHamburgerClick = () => {
    setHamburgItems(!hamburgItems);
  };

  function handleBookmark() {
    window.location.assign("/bookmarks");
  }

  return (
    <div className="header">
      {!isLoggedIn && (
        <div className="header-items">
          <button
            className="register-button gap"
            onClick={handleRegisterModalOpen}
          >
            Register Now
          </button>
          <button className="sign-in-button gap" onClick={handleLoginModalOpen}>
            Sign In
          </button>
        </div>
      )}
      {isLoggedIn && (
        <div className="header-items">
          <button className="register-button gap" onClick={handleBookmark}>
            <IoBookmark />
            Bookmarks
          </button>
          <button
            className="register-button gap"
            onClick={handleStoryModalOpen}
          >
            Add Story
          </button>
          <button className="gap icons">
            <IoPersonCircle size={40} />
          </button>
          <button className="gap icons">
            <GiHamburgerMenu size={40} onClick={handleHamburgerClick} />
          </button>
          {hamburgItems && (
            <div
              style={{
                position: "fixed",
                right: "0",
                top: "4rem",
                background: "white",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "1rem" }}>Your Name</h3>
              <button onClick={handleLogout} className="register-button">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={registerModal}
        onRequestClose={handleRegisterModalClose}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <Register closeModal={handleRegisterModalClose} />
      </Modal>
      <Modal
        isOpen={loginModal}
        onRequestClose={handleLoginModalClose}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <SignIn
          closeModal={handleLoginModalClose}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Modal>
      <Modal
        isOpen={storyModal}
        onRequestClose={handleStoryModalClose}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <AddStory closeModal={handleStoryModalClose} />
      </Modal>
    </div>
  );
}
