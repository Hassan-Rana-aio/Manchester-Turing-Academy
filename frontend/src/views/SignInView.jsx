/** SignIn view with logo in sidebar */
import { Link } from "react-router-dom";
import LogoSidebar from "./reusableViews/logoSidebar";
import Images from "../constants/siteImages";
import SignIn from "./reusableViews/SignIn";

const SidebarLogoSignIn = () => {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3">
      <Link to={"/"}>
        <LogoSidebar
          logoImg={Images.logoImage}
          className={
            "bg-primaryBgDarkColor grid items-center justify-center px-4 lg:h-screen"
          }
        />
      </Link>

      <div className="lg:col-span-2 self-center">
        <SignIn />
      </div>
    </div>
  );
};

export default SidebarLogoSignIn;
