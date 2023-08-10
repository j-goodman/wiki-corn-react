// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
import Home from "./Components/Home";
import Index from "./Components/Index";
import Article from "./Components/Article";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import NotFound from "./Components/NotFound";

import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Navbar></Navbar>
        <div className="main-page">
          <Sidebar></Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Index />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="not-found" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
