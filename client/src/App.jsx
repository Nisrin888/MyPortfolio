import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./index.css"
import Projects from "./pages/Project";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Education from "./pages/Education";

export default function App() {
  return (
    <div>
  <Router>
    {/* Navbar */}
      <Navbar />
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} /> 
      </Routes>
    </Router>

    </div>
    
  );
}
