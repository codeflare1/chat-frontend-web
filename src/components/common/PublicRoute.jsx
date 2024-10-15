import { Navigate, Outlet } from "react-router-dom";
const PublicRoute = () => {
  const adminToken = window.localStorage.getItem("token");
  return (
    !adminToken ? <Outlet /> : <Navigate to='/chat' />
    )
};
export default PublicRoute;