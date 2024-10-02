import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ViewStory from "./ViewStory";
import { apiEndPoint, baseUrl } from "../env";

export default function BookmarkContent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMoreChecked, setShowMoreChecked] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${baseUrl}${apiEndPoint.story + "/saved"}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "auth-token": token,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        response = response.map((bookmark) => bookmark.story);
        setStories(response);
      });
  }, []);

  function openModal(item) {
    setModalIsOpen(item);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h1>Your Bookmarks</h1>
        <div className="stories-display">
          {!showMoreChecked && stories?.length > 4 ? (
            <>
              {stories?.slice(0, 4)?.map((item) => (
                <div
                  onClick={() => openModal(item)}
                  style={{
                    backgroundImage: `url(${item?.slides?.[0]?.image})`,
                    height: "300px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "10px",
                    textAlign: "left",
                    padding: "3rem",
                    color: "white",
                  }}
                >
                  <p style={{ marginTop: "250px" }}>
                    <p>{item?.slides?.[0]?.heading}</p>
                    <p>{item?.slides?.[0]?.description}</p>
                  </p>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => setShowMoreChecked(true)}
                  className="register-button"
                >
                  See More
                </button>
              </div>
            </>
          ) : stories.length ? (
            stories?.map((item) => (
              <div
                onClick={() => openModal(item)}
                style={{
                  backgroundImage: `url(${item?.slides?.[0]?.image})`,
                  height: "300px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "10px",
                  textAlign: "left",
                  padding: "3rem",
                  color: "white",
                }}
              >
                <p style={{ marginTop: "250px" }}>
                  <p>{item?.slides?.[0]?.heading}</p>
                  <p>{item?.slides?.[0]?.description}</p>
                </p>
              </div>
            ))
          ) : (
            <div>No stories Available</div>
          )}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <ViewStory closeModal={closeModal} story={modalIsOpen} />
        </Modal>
      </div>
    </div>
  );
}
