import { useEffect, useState, useContext } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import InputFieldWithLabel from "../components/InputFieldWithLabel/InputFieldWithLabel";
import { getUser, updateUser } from "../services/User";
import Loader from "../components/Loader/Loader";
import Button from "../components/Button/Button";
import { validateUpdateUser } from "../validators/UserValidators";
import { toast } from "react-toastify";

const UserAccountSetting = ({ closeModal }) => {
  const { currentUser, setCurrentUser } = useContext(MyContext);
  const [dataLoader, setDataLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    username: "",
    company_region: "",
    created_on: "",
    is_active: "",
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    company_city: "",
    password: "",
    new_password: "",
    confirm_password: "",
  });

  // useNavigate object
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const updateUserInformation = async (formData) => {
    setButtonLoader(true);
    if (validateUpdateUser(formData)) {
      try {
        const response = await updateUser(formData);
        if (response.status === 200) {
          setButtonLoader(false);
          closeModal();
          toast.success("User account information updated successfully");
        }
      } catch {
        setButtonLoader(false);
      }
    }
    setButtonLoader(false);
  };

  const getUserById = async (userId) => {
    const params = {
      user_id: userId,
    };

    setDataLoader(true);
    try {
      const response = await getUser(params);

      if (response?.status === 200) {
        response?.data?.data?.length > 0 &&
          setFormData(response?.data?.data[0]);
        response?.data?.data?.length > 0 &&
          setFormData((prevData) => ({
            ...prevData,
            password: "",
            new_password: "",
            confirm_password: "",
          }));
      }
    } catch {
      setDataLoader(false);
    }
    setDataLoader(false);
  };

  useEffect(() => {
    getUserById(currentUser?.user_id);
  }, []);

  return dataLoader ? (
    <Loader />
  ) : (
    <div className="grid grid-cols-1 gap-4 my-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"First Name"}
            placeholder={"Enter your first name"}
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
            placeholder={"Enter your last name"}
            onChange={handleInputChange}
            id={"last_name"}
            name={"last_name"}
            value={formData?.last_name}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Username"}
            placeholder={"Enter your username"}
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
            placeholder={"Enter your email"}
            onChange={handleInputChange}
            id={"email"}
            name={"email"}
            value={formData?.email}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"password"}
            labelText={"Password"}
            placeholder={"Enter your password"}
            onChange={handleInputChange}
            id={"password"}
            name={"password"}
          />
        </div>
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"password"}
            labelText={"New Password"}
            placeholder={"Enter your new password"}
            onChange={handleInputChange}
            id={"new_password"}
            name={"new_password"}
          />
        </div>
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"password"}
            labelText={"Confirm Password"}
            placeholder={"Confirm your password"}
            onChange={handleInputChange}
            id={"confirm_password"}
            name={"confirm_password"}
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
            placeholder={"Enter your region"}
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
            placeholder={"Enter your city"}
            onChange={handleInputChange}
            id={"company_city"}
            name={"company_city"}
            value={formData?.company_city}
          />
        </div>
      </div>

      <div className="justify-self-end flex gap-4">
        <div className="">
          {buttonLoader ? (
            <Loader height={48} />
          ) : (
            <Button
              buttonClass={
                "bg-buttonGreen p-2 text-white hover:bg-buttonGreenDark"
              }
              buttonText={"Submit"}
              funcToCall={updateUserInformation}
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

export default UserAccountSetting;
