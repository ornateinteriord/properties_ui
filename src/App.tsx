import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/home/Navbar";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/home/Footer";
import ApartmentPage from "./pages/apartments/ApartmentPage";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";

export const LoadingComponent = () => {
  return (
    <Dialog open={true}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/properties" element={<Contact/>} />
        <Route path="/apartment-properties" element={<ApartmentPage/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
