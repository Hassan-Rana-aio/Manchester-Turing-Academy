import { useState } from "react";

const SideBarLink = (props) => {
  const handleSidebarLink = () => {
    props?.setPanelComponent(props?.panelComponent);
  };

  return (
    <div
      className={`cursor-pointer px-2 py-2 my-1 mx-2 w-full ${
        props?.currentLinkPath === props?.panelComponent?.path
          ? "bg-white font-medium text-black rounded"
          : "text-white"
      }`}
    >
      <h1 onClick={handleSidebarLink}>{props?.name}</h1>
    </div>
  );
};

export default SideBarLink;
