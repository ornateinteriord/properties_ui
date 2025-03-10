import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/home/Navbar";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/home/Footer";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
<<<<<<< HEAD
import AllPropertiespage from "./pages/allProperties/AllPropertiespage";
import Property from "./pages/property/Property";
=======
import Properties from "./pages/Properties/Properties";
>>>>>>> 6c2244ce5e020041b924b8f657cd241442cdf925

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
<<<<<<< HEAD
        <Route path="/property" element={<Property/>} />
        <Route path="/properties" element={<AllPropertiespage/>} />
=======
        <Route path="/properties" element={<Properties/>} />
>>>>>>> 6c2244ce5e020041b924b8f657cd241442cdf925
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
