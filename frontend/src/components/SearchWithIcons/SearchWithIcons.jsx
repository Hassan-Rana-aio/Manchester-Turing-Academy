import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import InputFieldWithIcon from "../InputFieldWithIconButton/InputFieldWithIconButton";
import { useState } from "react";

const SearchWithIcons = ({
  divClass,
  setSearchValue,
  localSearchValue,
  setLocalSearchValue,
  showCancelButton,
  setShowCancelButton,
}) => {
  // handle search data
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    name === "ip_search" && setLocalSearchValue(value);
  };

  // handle when user clicks on search button
  const handleSearchButton = () => {
    setSearchValue(localSearchValue);
    setShowCancelButton(true);
  };

  // handle cancel button
  const handleCancelButton = () => {
    setLocalSearchValue("");
    setSearchValue("");
    document.getElementById("ip_search").value = "";
    setShowCancelButton(false);
  };

  return (
    <div className={divClass}>
      <p>Search</p>
      <InputFieldWithIcon
        name={"ip_search"}
        id={"ip_search"}
        value={localSearchValue}
        placeholder={"Search Here"}
        divClassName={
          "border-[1px] border-black flex items-center justify-between sm:text-md"
        }
        className={"w-full outline-none border-none p-2 mx-2"}
        onChange={handleSearchChange}
        PrimaryIcon={FaSearch}
        primaryIconColor={"black"}
        primaryOnClick={handleSearchButton}
        SecondaryIcon={RxCross2}
        secondaryIconColor={"black"}
        secondaryOnClick={handleCancelButton}
        displaySecondaryIcon={showCancelButton}
      />
    </div>
  );
};

export default SearchWithIcons;
