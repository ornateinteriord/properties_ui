import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/home/Navbar";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/home/Footer";
import ApartmentPage from "./pages/apartments/ApartmentPage";
import Land from "./pages/land/Land";
import Site from "./pages/site/Site";
import Villa from "./pages/villa/villa";
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
        <Route path="/land-properties" element={<Land/>} />
        <Route path="/site-properties" element={<Site/>} />
        <Route path="/villa-properties" element={<Villa/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
