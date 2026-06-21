import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import validateAddUser from "../../validators/UserValidators";
import InputFieldWithLabel from "../../components/InputFieldWithLabel/InputFieldWithLabel";
import addUser from "../../services/User";

import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../App";

const SignUp = () => {
  const { currentUser, setCurrentUser } = useContext(MyContext);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    company_name: "",
    company_region: "",
    company_city: "",
    password: "",
    confirm_password: "",
  });

  // form handler
  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const signUp = async (signUpData) => {
    setLoader(true);
    if (validateAddUser(signUpData)) {
      try {
        const response = await addUser(signUpData);
        if (response.status === 200) {
          navigate("/");
          toast.success("Account created successfully");
        }
      } catch {
        setLoader(false);
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    currentUser && toast.success("Already logged In") && navigate("/");
  });

  return (
    <div className="login p-6 grid items-center content-center justify-center gap-3">
      <p className="text-black text-2xl font-medium">Sign Up</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"First Name"}
            placeholder={"Enter your first name"}
            onChange={handleInputChange}
            id={"first_name"}
            name={"first_name"}
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
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
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
          />
        </div>
      </div>

      <p className="text-base">
        Already have an account?{" "}
        <Link className="text-textBlue hover:font-semibold" to={"/signin"}>
          Login
        </Link>
      </p>
      <div className="">
        {loader ? (
          <Loader className={"flex justify-start items-center"} height={48} />
        ) : (
          <Button
            buttonText={"Sign Up"}
            params={formData}
            buttonClass={
              "lg:w-[25%] w-[50%] px-2 py-2 bg-buttonBlue text-white hover:bg-buttonBlueDark"
            }
            funcToCall={signUp}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
