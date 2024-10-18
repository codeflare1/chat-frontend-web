import { Navigate, Outlet } from "react-router-dom";
const PublicRoute = () => {
  // const adminToken = window.localStorage.getItem("token");
  const statusCode = localStorage.getItem('statusCode'); // Get the status code from local storage
  return (
    statusCode !== "4" ? <Outlet /> : <Navigate to='/chat' />
    )
};
export default PublicRoute;