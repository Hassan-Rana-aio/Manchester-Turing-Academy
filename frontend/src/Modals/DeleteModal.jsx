import { FaTrash } from "react-icons/fa";
import Button from "../components/Button/Button";
import Loader from "../components/Loader/Loader";

const DeleteModalComponent = ({
  compText,
  iconSize,
  iconColor,
  functionToCall,
  params,
  loader,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 my-4">
      <FaTrash
        size={iconSize ? iconSize : 32}
        color={iconColor ? iconColor : "red"}
      />
      <p className="text-xl font-medium md:text-xl lg:text-xl">
        {compText
          ? compText
          : "You are about to delete the record. Are you sure?"}
      </p>
      {
        loader ? <Loader height={32} /> : <Button
        buttonText={"Delete"}
        buttonClass={"bg-[#ff0000] p-2 text-white font-medium"}
        funcToCall={functionToCall}
        params={params}
      />
      }
    </div>
  );
};

export default DeleteModalComponent;
