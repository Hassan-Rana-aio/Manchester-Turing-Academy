import { AiOutlineMenu } from "react-icons/ai";
import SideBarLink from "../SidebarLink/SidebarLink";
import { useEffect, useState } from "react";
import Images from "../../constants/siteImages";
import { Link } from "react-router-dom";

const PanelSidebar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleShowMenu = () => {
    setShowMenu((prevData) => !prevData);
  };

  // useEffect that runs once
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array means this runs once, on mount

  // Call useEffect based on screenWidth changes
  useEffect(() => {
    if (screenWidth >= 765) {
      setShowMenu(true);
    }
  }, [screenWidth]); // useEffect triggers whenever screenWidth changes

  return (
    <div className="bg-primaryBgDarkColor h-full">
      <div className="grid grid-cols-3 items-center px-4 py-8">
        <Link
          to={"/"}
          className="lg:block md:block hidden lg:col-span-3 md:col-span-3 col-span-2 justify-self-center"
        >
          <img src={Images.logoImageTwo} alt="" srcset="" />
        </Link>

        <Link
          to={"/"}
          className="lg:hidden md:hidden block lg:col-span-3 md:col-span-3 col-span-2 justify-self-center"
        >
          <img src={Images.logoImage} alt="" srcset="" />
        </Link>
        <button
          className="lg:hidden md:hidden justify-self-end"
          onClick={handleShowMenu}
        >
          <AiOutlineMenu color="white" size={32} />
        </button>
      </div>
      {showMenu && (
        <div className="grid grid-cols-1 justify-start lg:px-0 md:px-0 px-4 py-4 w-full">
          {props?.dynamicRoutes?.map((data, index) => {
            return (
              <SideBarLink
                key={index}
                panelComponent={data}
                name={data?.name}
                setPanelComponent={props.setPanelComponent}
                currentLinkPath={props.currentLinkPath}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PanelSidebar;
