import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AddArticle from "./AddArticle";
import Article from "./AllArticle";
import About from "./components/About/About";
import AdminDashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Dashboard/Login";
import Event from "./components/events/event";
import ArticlesCarousel from "./components/Home/Article";
import Home from "./components/Home/Home";
import StatSection from "./components/Home/stats";
import CustomizedSteppers from "./components/Dashboard/Stepper";
import Register from "./components/Dashboard/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/article" element={<AddArticle />} />
          <Route path="/al" element={<Article />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ar" element={<ArticlesCarousel />} />
          <Route path="/st" element={<StatSection />} />
          <Route path="/ab" element={<About />} />
          <Route path="/ev" element={<Event />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="*" element={<Navigate to="/home" replace={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
