import React from "react";
import ViewStory from "../ViewStory";

export default function StorySlidesModal() {
  return (
    <div className="modal">
      <div className="modal-content" style={{ width: "80%", padding: "4rem" }}>
        <ViewStory />
      </div>
    </div>
  );
}
