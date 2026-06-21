import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { MyContext } from "../App";
import { toast } from "react-toastify";

const AdminUserRoutes = () => {
  const { currentUser, setCurrentUser } = useContext(MyContext);

  return currentUser?.user_role.toLowerCase() === "admin" ||
    currentUser?.user_role.toLowerCase() === "user" ? (
    <Outlet />
  ) : (
    <div>
      <Navigate to="/signin" />
      {toast.error("You are not authorized to access it")}
    </div>
  );
};

export default AdminUserRoutes;
