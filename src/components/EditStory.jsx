import React, { useState } from "react";
import { apiEndPoint, baseUrl } from "../env";

export default function EditStory({ closeModal, story, setStory }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const handleInputChange = (event) => {
    event.preventDefault();
    const slide = story.slides[activeSlide];
    story.slides[activeSlide] = {
      ...slide,
      [event.target.name]: event.target.value,
    };
    setStory({ ...story });
  };
  const handleSlideClick = (index) => {
    setActiveSlide(index);
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const handleEditStory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${baseUrl}${apiEndPoint.story + "/edit/" + story._id}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
      }
    );
    if (response.status === 202) {
      alert("Story Updated successfully");
    } else {
      alert("Story Update failed");
    }
    closeModal();
  };
  const handleNextClick = () => {
    if (activeSlide < story?.slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const handlePreviousClick = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };
  return (
    <div>
      <div className="slide" style={{ width: "80%" }}>
        <div>
          <ul className="slides-button">
            {story?.slides?.map((slide, index) => (
              <li
                key={index}
                onClick={(e) => {
                  handleSlideClick(index);
                  e.stopPropagation();
                }}
                className={
                  index === activeSlide ? "active list-slides" : "list-slides"
                }
              >
                Slide {index + 1}
              </li>
            ))}
          </ul>
        </div>

        <form action="">
          <div className="fields">
            <label htmlFor="">Heading:</label>
            <input
              type="text"
              name="heading"
              placeholder="Heading"
              value={story?.slides[activeSlide].heading}
              onChange={(e) => {
                handleInputChange(e);
                e.stopPropagation();
              }}
              className="input-fields-style"
            />
          </div>

          <div className="fields">
            <label htmlFor="">Description:</label>
            <textarea
              name="description"
              placeholder="Story Description"
              value={story?.slides[activeSlide].description}
              onChange={(e) => {
                handleInputChange(e);
                e.stopPropagation();
              }}
              style={{
                padding: ".5rem",
                width: "60%",
                resize: "none",
                border: "1px solid black",
              }}
            />
          </div>
          <div className="fields">
            <label htmlFor="">Image:</label>
            <input
              type="text"
              name="image"
              placeholder="Add Image url"
              value={story?.slides[activeSlide].image}
              onChange={(e) => {
                handleInputChange(e);
                e.stopPropagation();
              }}
              className="input-fields-style"
            />
          </div>
          <div className="fields">
            <label htmlFor="">Category:</label>
            <select
              name="category"
              value={story.category}
              disabled
              onChange={(e) => setStory({ ...story, category: e.target.value })}
              className="input-fields-style"
            >
              <option value="">Select category</option>
              <option value="food">food</option>
              <option value="health and fitness">health and fitness</option>
              <option value="travel">travel</option>
              <option value="movie">movie</option>
              <option value="education">education</option>
            </select>
          </div>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <div className="display">
          <button
            className="register-button"
            style={{ background: "#7EFF73" }}
            onClick={(e) => {
              handlePreviousClick(e);
              e.stopPropagation();
            }}
            disabled={activeSlide === 0}
          >
            Previous
          </button>
          <button
            className="sign-in-button"
            style={{ background: "#73ABFF" }}
            onClick={(e) => {
              handleNextClick(e);
              e.stopPropagation();
            }}
            disabled={activeSlide === story.slides.length - 1}
          >
            Next
          </button>
        </div>
        <button
          onClick={(e) => {
            handleEditStory(e);
            e.stopPropagation();
          }}
          className="register-button"
        >
          Post
        </button>
      </div>
    </div>
  );
}
