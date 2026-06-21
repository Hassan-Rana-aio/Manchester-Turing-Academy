import ManageUsers from "../../views/PanelViews/ManageUsers/ManageUsers";
import ManageCourses from "../../views/PanelViews/ManageCourses/ManageCourses";
const dynamicRoutes = {
  admin: [
    {
      path: "/manage-users",
      name: "Manage Users",
      component: <ManageUsers />,
      icon: "",
    },
    {
      path: "/manage-courses",
      name: "Manage Courses",
      component: <ManageCourses />,
      icon: "",
    },
  ],
};

export default dynamicRoutes;
