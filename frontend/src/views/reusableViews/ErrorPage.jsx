import { Link } from "react-router-dom";
import errorImage from "../../assets/error.jpg";

const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Link to={"/"}>
        <img src={errorImage} alt="error-image" srcSet="" />
      </Link>
    </div>
  );
};

export default ErrorPage;
