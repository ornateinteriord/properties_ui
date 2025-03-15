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
import ReviewProperty from "./pages/AdminPages/tableProperty/ReviewProperty";
import Dashboard from "./pages/AdminPages/dashboard/Dashboard";
import AdminNavbar from "./pages/AdminPages/navbar/Navbar";
import UsersTable from "./pages/AdminPages/usertable/UsersTable";
import MyProfile from "./pages/myProfile/MyProfile";


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


  const adminRoutes = ["/admin/properties", "/admin/dashboard","/admin/users"];
  const validRoutes = ["/", "/signin", "/signup", "/about", "/contact", "/properties","/my-properties","/review-properties","/my-profile" ];

  // Check if the current route is valid
  const isValidRoute = validRoutes.includes(location.pathname);
  const isAdminRoute = adminRoutes.includes(location.pathname);

  return (
    <>
     {isAdminRoute && <AdminNavbar />}
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
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/admin/properties" element={<ReviewProperty/>} />
        <Route path="/admin/users" element={<UsersTable/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
