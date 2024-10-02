import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "react-modal";
import ViewStory from "./ViewStory";
import health from "../assets/health.jpg";
import food from "../assets/food.jpg";
import movie from "../assets/movie.jpg";
import travel from "../assets/travel.jpg";
import education from "../assets/education.jpg";
import edit from "../assets/edit.jpg";
import { apiEndPoint, baseUrl } from "../env";
import AddStory from "./modals/AddStory";

export default function HomePageContent() {
  const [showMoreChecked, setShowMoreChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [storyModal, setStoryModal] = useState(false);

  const [allStories, setAllStories] = useState();
  const [categoriesContent, setCategoriesContent] = useState([]);

  const [query] = useSearchParams();

  useEffect(() => {
    fetch(`${baseUrl}${apiEndPoint.story + "/all"}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setCategoriesContent(resp);
        setSelectedCategory("all");
      });
  }, []);

  useEffect(() => {
    const storyId = query.get("story");
    if (storyId && categoriesContent?.length) {
      for (let idx = 0; idx < categoriesContent.length; idx++) {
        const story = categoriesContent[idx];
        if (story._id == storyId) {
          openModal(story);
          break;
        }
      }
    }
  }, [query, categoriesContent]);

  const categories = [
    { name: "All", image: `${health}` },
    { name: "Food", image: `${food}` },
    { name: "Health & Fitness", image: `${health}` },
    { name: "Travel", image: `${travel}` },
    { name: "Movie", image: `${movie}` },
    { name: "Education", image: `${education}` },
  ];

  function openModal(item) {
    setModalIsOpen(item);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const handleStoryModalOpen = () => {
    setStoryModal(true);
  };

  const handleStoryModalClose = () => {
    setStoryModal(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${baseUrl}${apiEndPoint.story + "/my"}`, {
        method: "GET",
        headers: {
          "auth-token": token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((response) => {
          setAllStories(response);
        });
    }
  }, []);

  async function handleCategoryClick(item) {
    setSelectedCategory(item);

    const category = item?.toLowerCase();
    let categoryFilter = "";
    if (category != "all") {
      categoryFilter = `?category=${category}`;
    }
    let response = await fetch(
      `${baseUrl}${apiEndPoint.story + "/all" + categoryFilter}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      response = await response.json();
      console.log(response);
      setCategoriesContent(response);
    } else {
      alert("Username or password wrong");
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="categories">
        {categories.map((category) => (
          <div
            style={{
              backgroundImage: `url(${category.image})`,
              borderRadius: "1.4rem",
            }}
          >
            <button
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
              // key={category._id}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      {allStories && (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <h1>Your Stories</h1>
          <div className="stories-display">
            {!showMoreChecked && allStories?.length > 4 ? (
              <>
                {allStories?.slice(0, 4)?.map((item) => (
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
            ) : allStories.length ? (
              allStories?.map((item) => (
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      style={{
                        marginTop: "2rem",
                        borderRadius: "10px",
                        border: "none",
                        padding: ".5rem",
                        backgroundColor: "white",
                        alignContent: "center",
                        display: "flex",
                      }}
                      onClick={(e) => {
                        handleStoryModalOpen();
                        e.stopPropagation();
                      }}
                    >
                      <img src={edit} alt="" />
                      Edit
                    </button>
                    <Modal
                      isOpen={storyModal}
                      onRequestClose={handleStoryModalClose}
                      contentLabel="Example Modal"
                      className="modal"
                      overlayClassName="overlay"
                    >
                      <AddStory
                        closeModal={handleStoryModalClose}
                        item={item}
                      />
                    </Modal>
                  </div>
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
      )}
      <div style={{ textAlign: "center", padding: "30px" }}>
        {selectedCategory ? (
          <h1>Top Stories About {selectedCategory}</h1>
        ) : (
          <h1>Top All Stories</h1>
        )}
        <div className="stories-display">
          {!showMoreChecked && categoriesContent?.length > 4 ? (
            <>
              {categoriesContent?.slice(0, 4)?.map((item) => (
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
          ) : categoriesContent.length ? (
            categoriesContent?.map((item) => (
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
