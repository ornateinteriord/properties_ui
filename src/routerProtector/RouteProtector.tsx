import { Navigate, Outlet } from "react-router-dom";
import TokenService from "../api/token/TokenService";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Array of roles allowed to access the route
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const userRole = TokenService.getRole(); // Get the user's role from the token

  // If the user is not authenticated, redirect to the sign-in page
  if (!userRole) {
    return <Navigate to="/signin" replace />;
  }

  // If the user's role is not included in the allowedRoles array, redirect to the appropriate page
  if (!allowedRoles.includes(userRole)) {
    // Redirect non-admin users to their dashboard
    if (userRole !== "admin") {
      return <Navigate to={`/`} replace />;
    }
    // Redirect admin users to the admin dashboard (or any other default route)
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If the user's role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;