import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./components/modals/SignIn";
import Register from "./components/modals/Register";
import Bookmark from "./pages/Bookmark";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookmarks" element={<Bookmark />} />
      </Routes>
    </>
  );
}

export default App;
