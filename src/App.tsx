import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from "react-router-dom";
import "./App.css";
import Navbar from "./components/home/Navbar";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/home/Footer";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { Box } from "@mui/material";
import Properties from "./pages/Properties/Properties";
import NotFound from "./pages/notfound/NotFound";
import CustomLoader from "./components/ui/Loader";
import MyProperty from "./pages/myProperty/MyProperty";
import ReviewProperty from "./pages/AdminPages/tableProperty/ReviewProperty";
import Dashboard from "./pages/AdminPages/dashboard/Dashboard";
import AdminNavbar from "./pages/AdminPages/navbar/Navbar";
import UsersTable from "./pages/AdminPages/usertable/UsersTable";
import MyProfile from "./pages/myProfile/MyProfile";
import ProtectedRoute from "./routerProtector/RouterProtector";
import PropertyCardView from "./components/property/card/PropertyCardView";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PropertyMap from "./pages/Maps/PropertyMap";
import EMICalculator from "./pages/Emi/Calculator";
import HelpandSupport from "./pages/help&support/HelpandSupport";
import ScrollToTop from "./components/scroll/ScrollToTop";

export const LoadingComponent = () => {
  return (
    <Box 
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent", // Semi-transparent white
        backdropFilter: "blur(2.5px)", // Blur effect
        zIndex: 9999, // Make sure it's on top
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CustomLoader />
      </Box>
    </Box>
  );
};


const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();


  const adminRoutes = ["/admin/properties", "/admin/dashboard","/admin/users"];
  const validRoutes = ["/", "/signin", "/signup","/reset-password", "/about", "/contact","/help-support", "/properties","/my-properties","/review-properties","/my-profile","/property/:propertyid" , '/emi-calculator' ];

  const isValidRoute = validRoutes.some((route) =>
    matchPath(route, location.pathname)
  );
  const isAdminRoute = !!adminRoutes.find(route => matchPath(route, location.pathname));


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
        <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/reset-password" element={<ForgotPassword/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/help-support" element={<HelpandSupport/>} />
        <Route path="/properties" element={<Properties/>} />
        <Route path="/my-properties" element={<MyProperty/>} />
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/property/:propertyid" element={<PropertyCardView/>} />
        <Route path="/properties-map" element={<PropertyMap />} />
        <Route path="/emi-calculator" element={<EMICalculator />} />

         {/* admin pages -------------- */}
         <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/properties" element={<ReviewProperty/>} />
        <Route path="/admin/users" element={<UsersTable/>} />
        </Route>

          {/* 404 page------------------------------- */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
