import { useRef, useState } from "react";
import React from "react";
import cross from "../../assets/cross.jpg";
import SlideComponent from "../SlideComponent";
import EditStory from "../EditStory";

export default function AddStory({ closeModal, item }) {
  const [story, setStory] = useState({
    category: "",
    slides: [
      {
        heading: "",
        description: "",
        image: "",
      },
      {
        heading: "",
        description: "",
        image: "",
      },
      {
        heading: "",
        description: "",
        image: "",
      },
    ],
  });

  return (
    <div className="modal">
      <div className="modal-content" style={{ width: "40%", padding: "3rem" }}>
        {" "}
        <div className="web-story-editor">
          {item ? (
            <EditStory
              closeModal={closeModal}
              story={item}
              setStory={setStory}
            />
          ) : (
            <SlideComponent
              story={story}
              setStory={setStory}
              closeModal={closeModal}
              item={item}
            />
          )}
        </div>
        <img
          src={cross}
          onClick={(e) => {
            e.stopPropagation();
            closeModal(e);
          }}
          alt=""
          width={30}
          style={{
            position: "fixed",
            top: "2rem",
            right: "2rem",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}
