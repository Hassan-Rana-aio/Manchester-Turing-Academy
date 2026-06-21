import { useState } from "react";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import Modal from "react-modal";
import Button from "../../Button/Button";

const ComponentModal = ({
  isOpen,
  closeModal,
  submitData,
  formData,
  modalHeading,
  modalHeadingClassName,
  MyComp,
}) => {
  const [buttonLoader, setButtonLoader] = useState(false);

  // function call
  async function handleSubmit() {
    try {
      setButtonLoader(true);
      await submitData(formData);
      setButtonLoader(false);
    } catch {
      toast.error("Request Failed");
    }
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark semi-transparent background
      zIndex: 1000, // Ensures it is on top of other elements
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "12px",
      border: "1px solid #ccc",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="my-3">
        <button
          className="absolute z-index-999 right-5 top-5 "
          onClick={closeModal}
        >
          <MdCancel size={24} />
        </button>
      </div>

      <div className={modalHeadingClassName ? modalHeadingClassName : ""}>
        {modalHeading ? modalHeading : ""}
      </div>

      {MyComp}
    </Modal>
  );
};

export default ComponentModal;
