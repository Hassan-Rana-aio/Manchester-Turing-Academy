import { toast } from "react-toastify";
import Button from "../components/Button/Button";
import { purchaseCourse } from "../services/Subscription";
import { useState } from "react";
import Loader from "../components/Loader/Loader";

const PurchaseCourse = (props) => {
  const [loader, setLoader] = useState(false);
  const handleCourseSubscription = async () => {
    setLoader(true);
    const params = {
      course_id: props?.paymentCourseData?.course_id,
      course_name: props?.paymentCourseData?.course_name,
      amount: props?.paymentCourseData?.course_price,
    };

    try {
      const response = await purchaseCourse(params);
      if (response.status === 200) {
        setLoader(false);
        response?.data &&
          response?.data?.url &&
          window.open(response?.data?.url, "_self", "noopener,noreferrer");
      } else {
        setLoader(false);
        toast.error("Payment Failed");
      }
    } catch {
      setLoader(false);
      toast.error("Payment Failed");
    }
    setLoader(false);
  };

  return (
    <div className="h-96 w-full pl-8 pr-16 grid justify-start">
      <h1 className="text-2xl">Checkout Summary</h1>
      <div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1">
            <label htmlFor="">Course Name</label>
            <p className="font-semibold">
              {props?.paymentCourseData?.course_name}
            </p>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="">Course Type</label>
            <p className="font-semibold">
              {props?.paymentCourseData?.course_type?.course_type_name}
            </p>
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="">Course Price</label>
            <p className="font-semibold">
              {props?.paymentCourseData?.course_price}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end">
        <div>
          {loader ? (
            <div className="flex">
              <Loader height={32} strokeWidth={3} />
            </div>
          ) : (
            <Button
              buttonClass={
                "p-2 text-white bg-buttonGreen hover:bg-buttonGreenDark"
              }
              buttonText={"Buy Now"}
              funcToCall={handleCourseSubscription}
            />
          )}
        </div>
        <Button
          buttonClass={"p-2 text-white bg-textGray hover:bg-textGrayHigh"}
          buttonText={"Close"}
          funcToCall={props.handleCoursePaymentModal}
        />
      </div>
    </div>
  );
};

export default PurchaseCourse;
