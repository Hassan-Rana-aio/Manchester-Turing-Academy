import { useEffect, useState, useContext } from "react";
import InputFieldWithLabel from "../components/InputFieldWithLabel/InputFieldWithLabel";
import addUser, { getUser, updateUser } from "../services/User";
import Loader from "../components/Loader/Loader";
import Button from "../components/Button/Button";
import {
  validateAdminAddUpdateUser,
  validateUpdateUser,
} from "../validators/UserValidators";
import { toast } from "react-toastify";

const ManageUserModal = ({
  fetchUser = false,
  closeModal,
  userData,
  setRefreshData,
}) => {
  const [buttonLoader, setButtonLoader] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    company_region: "",
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    company_city: "",
    password: "",
    is_admin: false,
  });

  function handleInputChange(e) {
    const { name, type, checked, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleUser = () => {
    fetchUser ? _updateUser(formData) : _addUser(formData);
  };

  const _updateUser = async (formData) => {
    setButtonLoader(true);
    if (validateAdminAddUpdateUser(formData)) {
      try {
        const response = await updateUser(formData);
        if (response.status === 200) {
          setButtonLoader(false);
          closeModal();
          toast.success("User account information updated successfully");
          setRefreshData((prevVal) => !prevVal);
        }
      } catch {
        setButtonLoader(false);
      }
    }
    setButtonLoader(false);
  };

  const _addUser = async (formData) => {
    setButtonLoader(true);
    if (validateAdminAddUpdateUser(formData)) {
      try {
        const response = await addUser(formData);
        if (response.status === 200) {
          toast.success("New user added successfully");
          closeModal();
          setRefreshData((prevVal) => !prevVal);
        }
        setButtonLoader(false);
      } catch {
        setButtonLoader(false);
      }
    }
    setButtonLoader(false);
  };

  useEffect(() => {
    fetchUser && setFormData(userData);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 my-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"First Name"}
            placeholder={"Enter first name"}
            onChange={handleInputChange}
            id={"first_name"}
            name={"first_name"}
            value={formData?.first_name}
          />
        </div>
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Last Name"}
            placeholder={"Enter last name"}
            onChange={handleInputChange}
            id={"last_name"}
            name={"last_name"}
            value={formData?.last_name}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Username"}
            placeholder={"Enter username"}
            onChange={handleInputChange}
            id={"username"}
            name={"username"}
            value={formData?.username}
          />
        </div>
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Email"}
            placeholder={"Enter email"}
            onChange={handleInputChange}
            id={"email"}
            name={"email"}
            value={formData?.email}
          />
        </div>
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"password"}
            labelText={"Password"}
            placeholder={"Enter password"}
            onChange={handleInputChange}
            id={"password"}
            name={"password"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Company Name"}
            placeholder={"Enter company name"}
            onChange={handleInputChange}
            id={"company_name"}
            name={"company_name"}
            value={formData?.company_name}
          />
        </div>
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Company Region"}
            placeholder={"Enter region"}
            onChange={handleInputChange}
            id={"company_region"}
            name={"company_region"}
            value={formData?.company_region}
          />
        </div>
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Company City"}
            placeholder={"Enter city"}
            onChange={handleInputChange}
            id={"company_city"}
            name={"company_city"}
            value={formData?.company_city}
          />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="flex gap-4">
          <label htmlFor="">Is Admin?</label>
          <input
            type="checkbox"
            className=""
            name="is_admin"
            id="is_admin"
            checked={formData?.is_admin}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="justify-self-end flex gap-2">
        <div>
          {buttonLoader ? (
            <Loader height={48} />
          ) : (
            <Button
              buttonClass={
                "bg-buttonGreen p-2 text-white hover:bg-buttonGreenDark"
              }
              buttonText={"Submit"}
              funcToCall={handleUser}
              params={formData}
            />
          )}
        </div>
        <Button
          buttonClass={"bg-textGray p-2 text-white hover:bg-textGrayHigh"}
          buttonText={"Close"}
          funcToCall={closeModal}
          params={formData}
        />
      </div>
    </div>
  );
};

export default ManageUserModal;
