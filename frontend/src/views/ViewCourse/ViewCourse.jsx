import { useParams } from "react-router-dom";
import { getCourse } from "../../services/Course";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import ComponentModal from "../../components/Modals/ComponentModal/ComponentModal";
import PDFViewModal from "../../Modals/PDFViewModal";
import { MyContext } from "../../App";
import checkUserSubscription from "../../services/Subscription";
import PurchaseCourse from "../../Modals/PaymentModal";

const ViewCourse = () => {
  const { currentUser, setCurrentUser } = useContext(MyContext);

  const [courseData, setCourseData] = useState([]);
  const [courseSubscriptionStatus, setCourseSubscriptionStatus] =
    useState(false);
  const [viewFileModal, setViewFileModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [courseDataLoader, setCourseDataLoader] = useState(false);
  const [paymentCourseData, setPaymentCourseData] = useState(null);
  const { course_id } = useParams();

  const getCourseInformation = async (courseId) => {
    const params = {
      course_id: courseId,
    };

    try {
      const response = await getCourse(params);
      if (response.status === 200) {
        setCourseData(response?.data?.data ? response?.data?.data[0] : null);
      }
    } catch {}
  };

  const verifySubscription = async (courseId) => {
    const params = {
      course_id: courseId,
    };

    try {
      const response = await checkUserSubscription(params);
      if (response.status === 200) {
        setCourseSubscriptionStatus(
          response?.data?.subscription_status
            ? response?.data?.subscription_status
            : false
        );
      }
    } catch {}
  };

  const handleViewFileModal = () => {
    setViewFileModal((prevValue) => !prevValue);
  };

  const handleCoursePaymentModal = (courseData) => {
    setPaymentCourseData(courseData);
    setOpenPaymentModal((prevValue) => !prevValue);
  };

  useEffect(() => {
    course_id && getCourseInformation(course_id);
    course_id && verifySubscription(course_id);
  }, [course_id]);

  return (
    <div className="w-screen">
      <Header />
      <div>
        {courseDataLoader ? (
          <Loader />
        ) : (
          <div className="w-full py-2">
            {courseData && (
              <div className="grid grid-cols-1 w-full">
                <div className="w-full grid grid-cols-1 gap-4 justify-items-center py-12">
                  <h1 className="uppercase text-3xl py-8">
                    Course Information
                  </h1>
                  <div className="grid grid-cols-1 lg:w-[50%] px-12 gap-2">
                    <div className="flex gap-4 justify-between">
                      <p>Name : </p>
                      <p className="">{courseData?.course_name}</p>
                    </div>
                    <div className="flex gap-4 justify-between">
                      <p>Type : </p>
                      <p>{courseData?.course_type?.course_type_name}</p>
                    </div>
                    <div className="flex gap-4 justify-between">
                      <p>Price : </p>
                      <p>${courseData?.course_price}</p>
                    </div>
                    <div className="py-2">
                      <p>{courseData?.course_description}</p>
                    </div>
                    <div className="py-1 grid grid-cols-1 gap-2">
                      {courseSubscriptionStatus ? (
                        <Button
                          buttonClass={"p-2 bg-buttonGreen text-white"}
                          buttonText={"Open Course File"}
                          funcToCall={handleViewFileModal}
                        />
                      ) : (
                        <Button
                          buttonClass={"p-2 bg-buttonGreen text-white"}
                          buttonText={
                            "Buy Course"
                          }
                          funcToCall={() => {
                            handleCoursePaymentModal(courseData);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
      <ComponentModal
        isOpen={viewFileModal}
        closeModal={handleViewFileModal}
        MyComp={<PDFViewModal course={courseData?.course_id} />}
        formData={null}
        submitData={null}
      />
      <ComponentModal
        isOpen={openPaymentModal}
        closeModal={handleCoursePaymentModal}
        MyComp={<PurchaseCourse handleCoursePaymentModal={handleCoursePaymentModal} paymentCourseData={paymentCourseData} />}
        formData={null}
        submitData={null}
      />{" "}
    </div>
  );
};

export default ViewCourse;
