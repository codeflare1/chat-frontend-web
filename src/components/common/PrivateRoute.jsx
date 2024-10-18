import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  // const adminToken = window.sessionStorage.getItem("token");
  const statusCode = localStorage.getItem('statusCode'); // Get the status code from local storage
  if (statusCode == "4") {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
};
export default PrivateRoute;
