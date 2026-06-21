/** SignIn view with logo in sidebar */
import { Link } from "react-router-dom";
import LogoSidebar from "./reusableViews/logoSidebar";
import Images from "../constants/siteImages";
import SignUp from "./reusableViews/SignUp";

const SidebarLogoSignUp = () => {
  return (
    <div className="h-full grid lg:grid-cols-3">
      <Link to={"/"}>
        <LogoSidebar
          logoImg={Images.logoImage}
          className={
            "bg-primaryBgDarkColor grid items-center justify-center px-4 lg:h-screen"
          }
          imgClassName={"w-full lg:w-full md:w-[50%]"}
        />
      </Link>

      <div className="lg:col-span-2 self-center">
        <SignUp />
      </div>
    </div>
  );
};

export default SidebarLogoSignUp;
