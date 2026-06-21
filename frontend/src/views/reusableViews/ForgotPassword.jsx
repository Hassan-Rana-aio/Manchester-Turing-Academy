import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { resetPasswordService } from "../../services/Auth";
import { resetPasswordValidator } from "../../validators/UserValidators";
import InputFieldWithLabel from "../../components/InputFieldWithLabel/InputFieldWithLabel";
import { toast } from "react-toastify";
import { REMEMBER_KEY } from "../../constants/auth";

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    user_identity: "",
    first_name: "",
    last_name: "",
    company_name: "",
    new_password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // verify identity details and set the new password (no email)
  const resetPassword = async (data) => {
    setLoader(true);
    if (resetPasswordValidator(data)) {
      try {
        const response = await resetPasswordService(data);

        if (response.status === 200) {
          // drop any stale remembered credentials so the old password is not prefilled
          localStorage.removeItem(REMEMBER_KEY);
          toast.success(response?.data?.message);
          navigate("/signin");
        }
      } catch {
        setLoader(false);
      }
    }

    setLoader(false);
  };

  return (
    <div className="grid justify-center md:py-0 lg:py-0">
      <div className="grid gap-4">
        <p className="text-black text-2xl font-medium">Reset Password</p>
        <p className="text-sm text-gray-600 max-w-sm">
          Confirm your account details below to verify it&apos;s you, then set a
          new password.
        </p>

        <InputFieldWithLabel
          type={"text"}
          labelText={"Email or Username"}
          placeholder={"Enter your email or username"}
          onChange={handleInputChange}
          id={"user_identity"}
          name={"user_identity"}
          value={formData.user_identity}
        />
        <InputFieldWithLabel
          type={"text"}
          labelText={"First Name"}
          placeholder={"Enter your first name"}
          onChange={handleInputChange}
          id={"first_name"}
          name={"first_name"}
          value={formData.first_name}
        />
        <InputFieldWithLabel
          type={"text"}
          labelText={"Last Name"}
          placeholder={"Enter your last name"}
          onChange={handleInputChange}
          id={"last_name"}
          name={"last_name"}
          value={formData.last_name}
        />
        <InputFieldWithLabel
          type={"text"}
          labelText={"Company Name (if any)"}
          placeholder={"Enter your company name"}
          onChange={handleInputChange}
          id={"company_name"}
          name={"company_name"}
          value={formData.company_name}
        />
        <InputFieldWithLabel
          type={"password"}
          labelText={"New Password"}
          placeholder={"Enter your new password"}
          onChange={handleInputChange}
          id={"new_password"}
          name={"new_password"}
          value={formData.new_password}
        />
        <InputFieldWithLabel
          type={"password"}
          labelText={"Confirm New Password"}
          placeholder={"Re-enter your new password"}
          onChange={handleInputChange}
          id={"confirm_password"}
          name={"confirm_password"}
          value={formData.confirm_password}
        />

        {loader === true ? (
          <Loader height={48} />
        ) : (
          <Button
            buttonText={"Reset Password"}
            buttonClass={
              "px-2 py-2 bg-buttonBlue text-white hover:bg-buttonBlueDark"
            }
            funcToCall={resetPassword}
            params={formData}
          />
        )}

        <p className="text-base">
          Back to{" "}
          <Link className="text-textBlue hover:font-semibold" to={"/signin"}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
