import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { MyContext } from "../App";
import { toast } from "react-toastify";

const AdminOnlyRoutes = () => {
  const { currentUser, setCurrentUser } = useContext(MyContext);

  if (!currentUser || currentUser?.user_role?.toLowerCase() !== "admin") {
    toast.error("You are not authorized to access it");
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default AdminOnlyRoutes;
