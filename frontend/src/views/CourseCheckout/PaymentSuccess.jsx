import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateCourseSubscription } from "../../services/Subscription";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [courseSubscriptionFailed, setCourseSubscriptionFailed] =
    useState(false);
  const [updatingSystemFlag, setUpdatingSystemFlag] = useState(true);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const sessionId = searchParams.get("session_id");
  const sessionToken = searchParams.get("sessionToken");

  const handleProceedToCourse = () => {
    courseId ? navigate(`/view_course/${courseId}`) : navigate("/");
  };

  const _updateCourseSubscription = async (sessionId, sessionToken) => {
    try {
      const params = {
        session_id: sessionId,
        sessionToken: sessionToken,
      };
      const response = await updateCourseSubscription(params);
      if (response.status === 200) {
        // update flags
        setUpdatingSystemFlag(false);
        toast.success("Courses Purchased Successfully");
      } else {
        toast.error("Request Failed to update the system");
        setCourseSubscriptionFailed(true);
      }
    } catch {
      toast.error("Request Failed");
      setCourseSubscriptionFailed(true);
    }
  };

  useEffect(() => {
    // call the function to update the
    sessionId &&
      sessionToken &&
      _updateCourseSubscription(sessionId, sessionToken);
  }, [courseId, sessionId, sessionToken]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Payment Successful
        </h2>
        <p className="text-gray-700 mb-6">
          Your payment was successfully processed. You now have access to your
          course.{" "}
        </p>
        {!updatingSystemFlag ? (
          <button
            onClick={handleProceedToCourse}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Proceed
          </button>
        ) : (
          <div className=" text-black font-semibold py-2 px-4 rounded">
            {courseSubscriptionFailed ? (
              <p className="text-red-500">Course Subscription has failed</p>
            ) : (
              <p className="text-black">Hold on we are preparing course for you</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
