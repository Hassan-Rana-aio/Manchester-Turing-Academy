import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Images from "../../constants/siteImages";
import { MyContext } from "../../App";
import { toast } from "react-toastify";
import ComponentModal from "../Modals/ComponentModal/ComponentModal";
import UserAccountSetting from "../../Modals/UserAccountSetting";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(MyContext);
  const [userAccountSetting, setUserAccountSetting] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(null);
  //   const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu((prevValue) => !prevValue);
  };

  const [menuSize, setMenuSize] = useState(20);

  const updateMenuSize = () => {
    if (window.innerWidth < 768) {
      setMenuSize(18); // Mobile size
    } else {
      setMenuSize(22); // Default size for larger screens
    }
  };

  const handleUserAccount = () => {
    setUserAccountSetting((prevValue) => !prevValue);
  };

  const updateUser = async (formData) => {};

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userToken");
    setCurrentUser(null);
    navigate("/");
    toast.success("User logged out successfully");
  };

  // UseEffect

  useEffect(() => {
    // setUserData(currentUser);
  }, []);

  useEffect(() => {
    updateMenuSize(); // Set initial menu size
    window.addEventListener("resize", updateMenuSize);

    return () => {
      window.removeEventListener("resize", updateMenuSize);
    };
  }, []);

  return (
    <div className="bg-headerColor lg:px-16 md:px-16 sm--padding py-8 px-8">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <img
              className="h-auto min-w-[230px] max-w-[65%] md:max-w-[55%] lg:max-w-[40%]"
              src={Images.logoImage}
              alt=""
              srcSet=""
            />
          </Link>
        </div>
        <button className="bg-white h-fit py-1 px-2" onClick={handleMenu}>
          <AiOutlineMenu color="#8a8a8a" size={menuSize} />
        </button>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          menu ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="font-nunito-sans flex flex-col gap-1 text-white text-[15px] uppercase my-2 mx-3 lg:mx-3 md:mx-2">
          <li className="hover:font-semibold">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:font-semibold">
            <Link to={"/course/ai"}>Artificial Intelligence</Link>
          </li>
          <li className="hover:font-semibold">
            <Link to={"/course/ai_application"}>AI Applications</Link>
          </li>
          <li className="hover:font-semibold">
            <Link to={"/course/robotics"}>Robotics</Link>
          </li>
        </ul>
        <div className="grid md:flex md:justify-start lg:flex gap-2 my-3 mx-3 lg:mx-3 md:mx-2 text-sm">
          {currentUser && currentUser?.user_role === "admin" && (
            <Link to={"/dashboard/admin"}>
              <button
                id="admin-btn"
                className="w-full tracking-wider bg-buttonGreen py-3 px-4 text-sm uppercase text-white hover:font-semibold"
              >
                Dashboard
              </button>
            </Link>
          )}
          {currentUser && currentUser?.user_role === "user" && (
            <button
              id="account"
              className="tracking-wider bg-buttonBlue py-3 px-4 text-sm uppercase text-white hover:bg-buttonBlueDark  hover:font-semibold"
              onClick={handleUserAccount}
            >
              Account
            </button>
          )}
          {!currentUser && (
            <Link to={"/signin"}>
              <button
                id="login"
                className="tracking-wider bg-buttonBlue py-3 px-4 text-sm uppercase text-white hover:bg-buttonBlueDark hover:font-semibold"
                onClick={() => setIsLoginPage(true)}
              >
                Login
              </button>
            </Link>
          )}
          {currentUser && (
            <button
              id="logout"
              className="tracking-wider bg-buttonBlue py-3 px-4 text-sm uppercase text-white hover:bg-buttonBlueDark hover:font-semibold"
              onClick={logout}
            >
              Logout
            </button>
          )}
          {!currentUser && (
            <Link to={"/signup"}>
              <button
                id="signup"
                className="tracking-wider bg-buttonBlue py-3 px-4 text-sm uppercase text-white hover:bg-buttonBlueDark hover:font-semibold"
                onClick={() => setIsLoginPage(false)}
              >
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>

      <ComponentModal
        isOpen={userAccountSetting}
        closeModal={handleUserAccount}
        formData={userData}
        submitData={updateUser}
        modalHeading={"User Profile"}
        modalHeadingClassName={"text-4xl my-8"}
        MyComp={<UserAccountSetting closeModal={handleUserAccount} />}
      />
    </div>
  );
};

export default Header;
