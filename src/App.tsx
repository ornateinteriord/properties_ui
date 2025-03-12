import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/home/Navbar";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/home/Footer";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { Dialog, DialogContent } from "@mui/material";
import Properties from "./pages/Properties/Properties";
import NotFound from "./pages/notfound/NotFound";
import CustomLoader from "./components/ui/Loader";
import MyProperty from "./pages/myProperty/MyProperty";
import ReviewProperty from "./pages/tableProperty/ReviewProperty";


export const LoadingComponent = () => {
  return (
    <Dialog open={true}>
      <DialogContent >
        <CustomLoader />
      </DialogContent>
    </Dialog>
  );
};


const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const validRoutes = ["/", "/signin", "/signup", "/about", "/contact", "/properties","/my-properties","/review-properties"];

  // Check if the current route is valid
  const isValidRoute = validRoutes.includes(location.pathname);

  return (
    <>
      {isValidRoute && <Navbar />}
      {children}
      {isValidRoute && <Footer/>}
    </>
  );
};

function App() {
 
  return (
    <Router>
      <Layout >
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/properties" element={<Properties/>} />
        <Route path="/my-properties" element={<MyProperty/>} />
        <Route path="/review-properties" element={<ReviewProperty/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
