import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/home/Navbar";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/home/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/properties" element={<Contact/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
