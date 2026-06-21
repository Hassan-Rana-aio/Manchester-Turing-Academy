import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import {
  forgotPasswordService,
  resetPasswordService,
} from "../../services/Auth";
import {
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../../validators/UserValidators";
import InputFieldWithLabel from "../../components/InputFieldWithLabel/InputFieldWithLabel";
import { toast } from "react-toastify";
import { REMEMBER_KEY } from "../../constants/auth";

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);
  // step 1 => request OTP, step 2 => enter OTP and set a new password
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    user_identity: "",
    otp: "",
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

  // step 1: request an OTP to be emailed to the user
  const requestOtp = async (data) => {
    setLoader(true);
    if (forgotPasswordValidator(data)) {
      try {
        const response = await forgotPasswordService({
          user_identity: data.user_identity,
        });

        if (response.status === 200) {
          toast.success(response?.data?.message);
          setStep(2);
        }
      } catch {
        setLoader(false);
      }
    }

    setLoader(false);
  };

  // step 2: verify the OTP and set the new password
  const resetPassword = async (data) => {
    setLoader(true);
    if (resetPasswordValidator(data)) {
      try {
        const response = await resetPasswordService(data);

        if (response.status === 200) {
          // password changed -> drop any stale remembered credentials so the
          // sign in form does not prefill the old password
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
        <p className="text-black text-2xl font-medium">Forgot Password</p>

        {step === 1 ? (
          <>
            <p className="text-sm text-gray-600 max-w-sm">
              Enter your email or username and we&apos;ll send a one-time
              password (OTP) to your registered email.
            </p>
            <InputFieldWithLabel
              type={"text"}
              labelText={"User Identity"}
              placeholder={"Enter your email or username"}
              onChange={handleInputChange}
              id={"user_identity"}
              name={"user_identity"}
              value={formData.user_identity}
            />
            {loader === true ? (
              <Loader height={48} />
            ) : (
              <Button
                buttonText={"Send OTP"}
                buttonClass={
                  "px-2 py-2 bg-buttonBlue text-white hover:bg-buttonBlueDark"
                }
                funcToCall={requestOtp}
                params={formData}
              />
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 max-w-sm">
              We&apos;ve sent a 6 digit OTP to your email. Enter it below along
              with your new password. The OTP is valid for 30 minutes.
            </p>
            <InputFieldWithLabel
              type={"text"}
              labelText={"OTP"}
              placeholder={"Enter the 6 digit OTP"}
              onChange={handleInputChange}
              id={"otp"}
              name={"otp"}
              value={formData.otp}
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
            <p className="text-sm">
              Didn&apos;t get the OTP?{" "}
              <button
                className="text-textBlue hover:font-semibold"
                onClick={() => requestOtp(formData)}
              >
                Resend
              </button>
            </p>
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
          </>
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
