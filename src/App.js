import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
