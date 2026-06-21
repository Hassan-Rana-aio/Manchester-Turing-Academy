import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import signInService from "../../services/Auth";
import { loginValidator } from "../../validators/UserValidators";
import InputFieldWithLabel from "../../components/InputFieldWithLabel/InputFieldWithLabel";
import { toast } from "react-toastify";
import { MyContext } from "../../App";
import { REMEMBER_KEY } from "../../constants/auth";

// read & decode any previously remembered credentials
const getRememberedCreds = () => {
  try {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    return {
      user_identity: parsed.user_identity || "",
      // password is stored base64 encoded (obfuscation, not encryption)
      user_password: parsed.user_password ? atob(parsed.user_password) : "",
    };
  } catch {
    return null;
  }
};

const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(MyContext);
  const [loader, setLoader] = useState(false);
  const remembered = getRememberedCreds();
  const [userCreds, setUserCreds] = useState({
    user_identity: remembered?.user_identity || "",
    user_password: remembered?.user_password || "",
  });
  const [rememberMe, setRememberMe] = useState(Boolean(remembered));

  const navigate = useNavigate();

  // form handler
  function handleInputChange(e) {
    const { name, value } = e.target;

    setUserCreds((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    currentUser && toast.success("Already logged In") && navigate("/");
  });

  const login = async (formData) => {
    setLoader(true);
    if (loginValidator(formData)) {
      try {
        const response = await signInService(formData);

        if (response.status === 200) {
          // remember (or forget) the credentials based on the checkbox
          if (rememberMe) {
            localStorage.setItem(
              REMEMBER_KEY,
              JSON.stringify({
                user_identity: formData.user_identity,
                user_password: btoa(formData.user_password),
              })
            );
          } else {
            localStorage.removeItem(REMEMBER_KEY);
          }

          localStorage.setItem("userToken", response.data?.access_token);
          localStorage.setItem("userRole", response.data?.user_role);
          localStorage.setItem("userId", response?.data?.user_id);
          setCurrentUser({
            user_id: response?.data?.user_id,
            user_role: response.data?.user_role,
          });
          navigate("/");
          toast.success(response?.data?.message);
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
        <p className="text-black text-2xl font-medium">Sign In</p>
        <InputFieldWithLabel
          type={"text"}
          labelText={"User Identity"}
          placeholder={"Enter your email or username"}
          onChange={handleInputChange}
          id={"user_identity"}
          name={"user_identity"}
          value={userCreds.user_identity}
        />

        <InputFieldWithLabel
          type={"password"}
          labelText={"Password"}
          placeholder={"Enter your password"}
          onChange={handleInputChange}
          id={"user_password"}
          name={"user_password"}
          value={userCreds.user_password}
        />

        <div className="flex items-center justify-between gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
          <Link
            className="text-sm text-textBlue hover:font-semibold"
            to={"/forgot-password"}
          >
            Forgot Password?
          </Link>
        </div>

        <p className="text-base">
          Don't have an account?{" "}
          <Link className="text-textBlue hover:font-semibold" to={"/signup"}>
            Sign Up
          </Link>
        </p>
        {loader === true ? (
          <Loader height={48} />
        ) : (
          <Button
            buttonText={"Sign In"}
            buttonClass={
              "px-2 py-2 bg-buttonBlue text-white hover:bg-buttonBlueDark"
            }
            funcToCall={login}
            params={userCreds}
          />
        )}
      </div>
    </div>
  );
};

export default SignIn;
