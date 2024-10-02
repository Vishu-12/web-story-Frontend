import React, { useRef, useState } from "react";
import { apiEndPoint, baseUrl } from "../env";

export default function SlideComponent({ story, setStory, closeModal }) {
  const handleInputChange = (event) => {
    const slide = story.slides[activeSlide];
    story.slides[activeSlide] = {
      ...slide,
      [event.target.name]: event.target.value,
    };
    setStory({ ...story });
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const formRef = useRef(null);

  const handleSlideClick = (index) => {
    setActiveSlide(index);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handlePostCreation = async () => {
    if (story?.slides?.length < 3 || story?.slides?.length > 6) {
      return alert("slides length not valid");
    }
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}${apiEndPoint.story + "/create"}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(story),
    });

    if (response.ok) {
      alert("Story Create successfully");
    } else {
      alert("Story Create failed");
    }
    closeModal();
  };

  const handleSlideAdd = () => {
    if (story.slides.length >= 6) {
      alert("You cannot add more than 6 slides.");
      return;
    }

    const newSlide = {
      image: "",
      heading: "",
      description: "",
    };

    setStory({ ...story, slides: [...story.slides, newSlide] });
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
      <div className="slide">
        <div>
          <ul className="slides-button">
            {story?.slides?.map((slide, index) => (
              <li
                key={index}
                onClick={() => handleSlideClick(index)}
                className={
                  index === activeSlide ? "active list-slides" : "list-slides"
                }
              >
                Slide {index + 1}
              </li>
            ))}
            {story?.slides?.length < 6 && (
              <li className="list-slides" onClick={handleSlideAdd}>
                Add +
              </li>
            )}
          </ul>
        </div>

        <form action="" ref={formRef}>
          <div className="fields">
            <label htmlFor="">Heading:</label>
            <input
              type="text"
              name="heading"
              placeholder="Heading"
              value={story?.slides[activeSlide].heading}
              onChange={handleInputChange}
              className="input-fields-style"
            />
          </div>

          <div className="fields">
            <label htmlFor="">Description:</label>
            <textarea
              name="description"
              placeholder="Story Description"
              value={story?.slides[activeSlide].description}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="input-fields-style"
            />
          </div>
          <div className="fields">
            <label htmlFor="">Category:</label>
            <select
              name="category"
              value={story.category}
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
            onClick={handlePreviousClick}
            disabled={activeSlide === 0}
          >
            Previous
          </button>
          <button
            className="sign-in-button"
            style={{ background: "#73ABFF" }}
            onClick={handleNextClick}
            disabled={activeSlide === story.slides.length - 1}
          >
            Next
          </button>
        </div>
        <button onClick={handlePostCreation} className="register-button">
          Post
        </button>
      </div>
    </div>
  );
}
