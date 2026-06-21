import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const handleRetry = () => {
    courseId ? navigate(`/view_course/${courseId}`) : navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Payment Failed
        </h2>
        <p className="text-gray-700 mb-6">
          Unfortunately, we were unable to process your payment. Please try
          again or talk to admin
        </p>
        <button
          onClick={handleRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
