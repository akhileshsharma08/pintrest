import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Cookies from "js-cookie";
import Explore from "./components/Explore";
import FeedDetail from "./components/FeedDetail";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");

    if (storedToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn]);

  const ProtectedRoute = ({ element }) => {
    return loggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/post/:id" element={<FeedDetail />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route
            path="/profile"
            element={
              loggedIn ? <Profile /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
