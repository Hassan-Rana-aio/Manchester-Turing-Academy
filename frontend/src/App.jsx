import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./views/Home";
import SidebarLogoSignIn from "./views/SignInView";
import SidebarLogoSignUp from "./views/SignUpView";
import SidebarLogoForgotPassword from "./views/ForgotPasswordView";
import ErrorPage from "./views/reusableViews/ErrorPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminPanel from "./views/Admin/AdminPanel/AdminPanel";
import Course from "./views/Course/Course";
import ViewCourse from "./views/ViewCourse/ViewCourse";
import AdminOnlyRoutes from "./routes/AdminRoutes";
import Loader from "./components/Loader/Loader";
import AdminUserRoutes from "./routes/AdminUserRoutes";
import PaymentFailed from "./views/CourseCheckout/PaymentFailed";
import PaymentSuccess from "./views/CourseCheckout/PaymentSuccess";

export const MyContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /** UseEffect which calls when app starts */
  useEffect(() => {
    try {
      const userRole = localStorage.getItem("userRole");
      const userId = localStorage.getItem("userId");
      userRole && userId
        ? setCurrentUser((prevData) => ({
            ...prevData,
            user_role: userRole,
            user_id: userId,
          }))
        : setCurrentUser(null);
    } catch (error) {
      console.error("Error loading user data:", error);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <MyContext.Provider value={{ currentUser, setCurrentUser }}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/signin"} element={<SidebarLogoSignIn />} />
          <Route path={"/signup"} element={<SidebarLogoSignUp />} />
          <Route
            path={"/forgot-password"}
            element={<SidebarLogoForgotPassword />}
          />

          <Route element={<AdminOnlyRoutes />}>
            <Route path={"/dashboard/admin"} element={<AdminPanel />} />
          </Route>

          <Route element={<AdminUserRoutes />}>
            <Route path={"/view_course/:course_id"} element={<ViewCourse />} />
            <Route path={"/payment/cancel"} element={<PaymentFailed />} />
            <Route path={"/payment/success"} element={<PaymentSuccess />} />
          </Route>

          <Route path={"/course/:course_type_name"} element={<Course />} />
          <Route path={"*"} element={<ErrorPage />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
