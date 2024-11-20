import React, { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import cross from "../assets/cross1.png";
import share from "../assets/share.png";
import bookmark from "../assets/bookmark.png";
import heart from "../assets/heart.png";
import redHeart from "../assets/red-heart.png";
import blueBookmark from "../assets/blue-bookmark.png";
import Modal from "react-modal";
import { apiEndPoint, baseUrl } from "../env";
import SignIn from "./modals/SignIn";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const slideContent = {
  color: "white",
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const divStyle = {
  width: "70%",
  alignItems: "center",
  backgroundSize: "cover",
  height: "400px",
  backgroundRepeat: "no-repeat",
};

export default function ViewStory({ story, closeModal }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likes, setLikes] = useState([]);
  const [bookmarks, setBookmarks] = useState(0);
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${baseUrl}${apiEndPoint.story + "/likes/" + story?._id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => setLikes(resp));
      fetch(`${baseUrl}${apiEndPoint.story + "/saves/" + story?._id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => setBookmarks(resp));
      setIsLoggedIn(token);
    }
  }, []);
  const handleLoginModalOpen = () => {
    setLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setLoginModal(false);
  };

  async function bookmarkStory() {
    const token = localStorage.getItem("token");
    if (token) {
      if (story._id) {
        let response = await fetch(
          `${baseUrl}${apiEndPoint.story + "/save/" + story._id}`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "auth-token": isLoggedIn,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          response = await response.json();
        }
      }
    } else {
      handleLoginModalOpen();
    }
  }

  async function likeStory() {
    const token = localStorage.getItem("token");
    if (token) {
      if (story._id) {
        let response = await fetch(
          `${baseUrl}${apiEndPoint.story + "/like/" + story._id}`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "auth-token": isLoggedIn,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          response = await response.json();
        }
      }
    } else {
      handleLoginModalOpen();
    }
  }
  let autherIds;
  if (likes && likes.length > 0) {
    autherIds = likes.map((like) => {
      if (like.user) {
        return like.user;
      }
      return null;
    });
  } else {
    console.log("No likes found");
  }

  let authorIdBookmark;
  if (bookmarks && bookmarks.length > 0) {
    authorIdBookmark = bookmarks.map((bookmark) => {
      if (bookmark.user) {
        return bookmark.user;
      }
      return null;
    });
  } else {
    console.log("No likes found");
  }
  return (
    <div className="modal-slide">
      <div className="modal-content-slide">
        <div className="slide-container">
          <Carousel
            responsive={responsive}
            slidesToSlide={1}
            showDots={true}
            autoPlay={true}
            style={{ border: "5px solid black" }}
          >
            {story?.slides?.map((slideImage, index) => (
              <div
                key={index}
                style={{
                  border: "none",
                  width: "100%",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <img onClick={closeModal} src={cross} alt="" width={20} />
                  <img
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `http://localhost:5173?story=${story._id}`
                      );
                      alert(
                        `Link Copied to clipboard +> http://localhost:5173?story=${story._id}`
                      );
                    }}
                    src={share}
                    alt=""
                    width={20}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      ...divStyle,
                      backgroundImage: `url(${slideImage.image})`,
                    }}
                  ></div>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <div style={slideContent}>{slideImage.heading}</div>
                  <div style={slideContent}>{slideImage.description}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    {authorIdBookmark?.includes(story?.author?._id) ? (
                      <img src={blueBookmark} alt="" />
                    ) : (
                      <img
                        onClick={bookmarkStory}
                        src={bookmark}
                        alt=""
                        width={20}
                      />
                    )}
                  </div>
                  <div>
                    {autherIds?.includes(story?.author?._id) ? (
                      <img src={redHeart} alt="" width={20} />
                    ) : (
                      <img onClick={likeStory} src={heart} alt="" width={20} />
                    )}
                    <span style={{ color: "white" }}>{likes.length}</span>
                  </div>
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
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
